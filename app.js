// below is the list of default questions 

// correct is the index of the correct answer within the array

let newQuestion = null;

let defaultQuestions = [
    {
        question: 'А и Б сидели на ',
        answers: ['одной зарплате', 'трубе', 'пособии для безработных', 'жёрдочке'],
        correct: [1]
    },
    {
        question: 'How much wood could a woodchuck chuck if a woodchuck could',
        answers: ['drink water', 'eat berries', 'chuck wood', 'play tetris'],
        correct: [2]
    },
    {
        question: 'Язык до Киева ',
        answers: ['допрыгнет', 'добежит', 'доползет', 'доведет'],
        correct: [3]
    },
    {
        question: 'Ландан ис зэ кэпитол оф ',
        answers: ['Габон', 'Грэйт Бритон', 'Галактик Эмпайр', 'Репаблик оф Беларус'],
        correct: [1]
    },
    {
        question: 'In the grim dark future there is only ',
        answers: ['war', 'death', 'destruction', 'all of the above'],
        correct: [0]
    }

]

// below is a function that populates question section with questions

const questionsGoHere = document.getElementById('questions-go-here');

const constructQuestionSections = function (questions) {
    for (let i = 0; i < questions.length; i++) {


        let section = document.createElement('section');
        section.classList.add('questions__container');
        questionsGoHere.appendChild(section);

        let header = document.createElement('h3');
        header.classList.add('questions__title');
        header.textContent = questions[i]['question'];
        section.appendChild(header);

        let questionsGridder = document.createElement('div');
        questionsGridder.classList.add('questions__gridder');
        section.appendChild(questionsGridder);

        for (let j = 0; j < questions[i]['answers'].length; j++) {

            let arrayOfAnswers = questions[i]['answers'];

            let questionsCheckboxContainer = document.createElement('div');
            questionsCheckboxContainer.classList.add('questions__checkbox-container');
            questionsGridder.appendChild(questionsCheckboxContainer);

            let checkbox = document.createElement('input');
            checkbox.classList.add('questions__checkbox');
            checkbox.classList.add('checkbox-question-' + i);
            checkbox.type = 'checkbox';
            questionsCheckboxContainer.appendChild(checkbox);

            let questionsAnswerContainer = document.createElement('div');
            questionsAnswerContainer.classList.add('questions__answer-container');
            questionsGridder.appendChild(questionsAnswerContainer);

            let questionsAnswer = document.createElement('p');
            questionsAnswer.classList.add('questions__answer');
            questionsAnswer.textContent = arrayOfAnswers[j];
            questionsAnswerContainer.appendChild(questionsAnswer);
        }
    }
}



/* below is a function that engages and populates the modal window 
     function should be provided with a title, message(false if none), and whether a textarea shoul be displayed(true or false) */

const modalInput = document.getElementById('modal__input');

const constructModalWindow = function (title, message, textInput) {

    const modalHeader = document.getElementById('modal__header');
    modalHeader.textContent = title;

    const modalContent = document.getElementById('modal__content');
    if (message) {
        modalContent.innerHTML = message;
        modalContent.hidden = false;
    } else {
        modalContent.hidden = true;
    }

    
    if (textInput) {
        modalInput.hidden = false;
    } else {
        modalInput.hidden = true;
    }


}


// below is the function that hides-shows the modal window

let toggleModalVisibility = function(okShown) {
    document.getElementById('modal').classList.toggle('hidden');
    if (!okShown) {
        okButton.classList.add('hidden');
    } else {
        okButton.classList.remove('hidden');
    }
}



// below is an event handler for the 'cancel' button in the modal window + selection of 'OK' button

const cancelButton = document.getElementById('cancel__button');
cancelButton.addEventListener('click', toggleModalVisibility);

const okButton = document.getElementById('ok__button');



// below is a function that handles the quiz start

const finishTestButton = document.getElementById('finish-test-button');

const startTheQuizFunction = function () {
    addQuestionButton.disabled = true;
    startQuizButton.disabled = true;
    finishTestButton.disabled = false;
    constructQuestionSections(defaultQuestions);

}

// below is the event handler for 'Start the quiz' button

const startQuizButton = document.getElementById('start-quiz');
startQuizButton.addEventListener('click', startTheQuizFunction);

// below is a function that checks what type of result did the user acheive.

const determineResult = function (someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed) {

    if (someQuestionsUnanswered) {
        console.log('есть неотвеченные');
        constructModalWindow(systemMessages['T2'], systemMessages['CC4'], false);
        toggleModalVisibility(false);
    } else if (amountOfQuestionsPassed === defaultQuestions.length) {
        console.log('всё правильно');
        constructModalWindow(systemMessages['T1'], systemMessages['CC5'](amountOfQuestionsPassed), false);
        toggleModalVisibility(false);
    } else {
        constructModalWindow(systemMessages['T3'], systemMessages['CC7'](amountOfQuestionsPassed, questionsNotPassed), false);
        toggleModalVisibility(false);
        console.log(questionsNotPassed);
    }
}

// below is a function that wraps up the test and compares the result

const finishTestFunction = function () {

    let amountOfQuestionsPassed = 0;
    let someQuestionsUnanswered = false;
    let questionsNotPassed = []

    // below is a part of function that creates arrays of checkboxes that were marked as checked at the time of pressing the 'Finish the test button' 

    for (let i = 0; i < defaultQuestions.length; i++) {
        let checkboxSet = document.querySelectorAll('.checkbox-question-' + i);
        let checkmarkedBoxes = [];

        for (let j = 0; j < defaultQuestions[i]['answers'].length; j++) {
            if (checkboxSet[j].checked) {
                checkmarkedBoxes.push(j);
            }
        }

        if (JSON.stringify(defaultQuestions[i]['correct']) === JSON.stringify(checkmarkedBoxes)) {
            defaultQuestions[i]['passed'] = true;
            console.log(checkmarkedBoxes + ' = ' + defaultQuestions[i]['correct']);
            amountOfQuestionsPassed++;
        } else if (!checkmarkedBoxes.length) {
            someQuestionsUnanswered = true;
            console.log(someQuestionsUnanswered);
        } else {
            defaultQuestions[i]['passed'] = false;
            questionsNotPassed.push(i);
        }

    }
    determineResult(someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed);

}

// below is the event handler for 'Finish the test' button

finishTestButton.addEventListener('click', finishTestFunction);









                    /* below goes the logic that handles new questions addition including both action and visual logic */


// below is the function that generates new questions from the modal window into defaultQuestions array


let stepNumber;

const addQuestion = function () {
    stepNumber = 0;
    newQuestion = {
        question: '',
        answers: [],
        correct: []
    }
    constructModalWindow(systemMessages.T4, false, true);
    modalInput.value = '';
    modalInput.focus();
    toggleModalVisibility(true);
    
}


// below is an event handler for the 'add a question button'



const addQuestionButton = document.getElementById('add-question');
addQuestionButton.addEventListener('click', addQuestion);

// below is an event handler for the 'OK' button

okButton.addEventListener('click', function () {
    if (!modalInput.value) {
        switch (stepNumber) {
            case 0:
                constructModalWindow(systemMessages.T5, systemMessages.CC1, false);
                okButton.classList.add('hidden');
                break;
            case 1:
            case 2:
            case 3:
            case 4:                    
                constructModalWindow(systemMessages.T5, systemMessages.CC2(stepNumber), false);
                okButton.classList.add('hidden');
                break;
            case 5:
                constructModalWindow(systemMessages.T5, systemMessages.CC3, false);
                okButton.classList.add('hidden');
                break;
        }

        
    } else {
        switch (stepNumber) {
            case 0:
                newQuestion['question'] = modalInput.value;
                modalInput.value = '';
                modalInput.focus();
                stepNumber++;
                constructModalWindow(systemMessages.T6(stepNumber), false, true);
                break;
            case 1:
            case 2:
            case 3:
                newQuestion.answers[stepNumber - 1] = modalInput.value;
                modalInput.value = '';
                modalInput.focus();
                stepNumber++;
                constructModalWindow(systemMessages.T6(stepNumber), false, true);
                break;
            case 4:
                newQuestion.answers[stepNumber - 1] = modalInput.value;
                modalInput.value = '';
                modalInput.focus();
                stepNumber++;
                constructModalWindow(systemMessages.T7, false, true);

                break;
            case 5:
                let isCorrectOk = /^([1-4],){1,3}[1-4]$/.test(modalInput.value);
                if (isCorrectOk) {
                    newQuestion.correct = modalInput.value.split(',');
                    newQuestion.correct = newQuestion['correct'].map(function(v) { return Number(v); });
                    let noRepeatsSet = new Set(newQuestion.correct);
                    newQuestion.correct = [...noRepeatsSet];
                    newQuestion.correct = newQuestion['correct'].sort();
                } else {
                    constructModalWindow(systemMessages.T5, systemMessages.CC6, false);
                    okButton.classList.add('hidden');
                    return;
                }
                

                console.log(newQuestion);
                defaultQuestions.push(newQuestion);
                toggleModalVisibility(false);
                break;
        }
            
    }
    
})