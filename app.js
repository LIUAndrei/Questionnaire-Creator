
/* *************************************************
    This app was written by Andrei Liubinski as a part of 
    practice test for LeverX group of Minsk,Belarus
    on 12.05.2021
    Please refer to https://github.com/LIUAofStevensTransport/LeverX-Practice-Test 
    for the latest version as well as a pdf containing conditions and requirements for the test app


******************************************************/


/* 1. below is the list of default questions 
    correct is the index of the correct answer within the array */

let newQuestion = null;

let questionSet = [
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

// 2. below is a function that populates question section with questions

const questionsGoHere = document.getElementById('questions-go-here');

const constructQuestionSections = function (questions) {

    for (let i = 0; i < questions.length; i++) {   // this loop creates a section tag for the question, it's title and inserts a gridded div that will contain answers and their respective checkboxes

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

        for (let j = 0; j < questions[i]['answers'].length; j++) { // this loop creates divs to populate the gridder created in the master loop with checkboxes and questions 

            let arrayOfAnswers = questions[i]['answers'];

            let questionsCheckboxContainer = document.createElement('div');
            questionsCheckboxContainer.classList.add('questions__checkbox-container');
            questionsGridder.appendChild(questionsCheckboxContainer); //container for checkbox

            let checkbox = document.createElement('input');
            checkbox.classList.add('questions__checkbox');
            checkbox.classList.add('checkbox-question-' + i);
            checkbox.type = 'checkbox';
            checkbox.id = 'checkbox' + i + j;
            questionsCheckboxContainer.appendChild(checkbox); // checkbox has an id that makes labeling possible

            let questionsAnswerContainer = document.createElement('div');
            questionsAnswerContainer.classList.add('questions__answer-container');
            questionsGridder.appendChild(questionsAnswerContainer); // answer container

            let questionsAnswer = document.createElement('label');
            questionsAnswer.classList.add('questions__answer');
            questionsAnswer.textContent = arrayOfAnswers[j];
            questionsAnswer.setAttribute('for', 'checkbox' + i + j);
            questionsAnswerContainer.appendChild(questionsAnswer); //answer in a form of label tag receives a for attribute
        }
    }
}



/* 3. below is a function that engages and populates the modal window 
     function should be provided with a title, message(false if none), and whether a textarea shoul be displayed(true or false) */

const modalInput = document.getElementById('modal__input');

const constructModalWindow = function (title, message, textInputShown) {

    const modalHeader = document.getElementById('modal__header');
    modalHeader.textContent = title;

    const modalContent = document.getElementById('modal__content');
    if (message) {
        modalContent.innerHTML = message;
        modalContent.hidden = false;
    } else {
        modalContent.hidden = true;
    }

    
    if (textInputShown) {
        modalInput.value = '';
        modalInput.hidden = false;
        modalInput.focus();
    } else {
        modalInput.hidden = true;
    }
}


// 4. below is the function that hides-shows the modal window



let showModalVisibility = function(okShown) {
    document.getElementById('modal').classList.remove('hidden');
    if (!okShown) {
        okButton.classList.add('hidden'); // some situations do not require both OK and Cancel buttons on the modal so I decided to hide OK when not in use
    } else {
        okButton.classList.remove('hidden');
    }
}

let hideModalVisibility = function() {
    document.getElementById('modal').classList.add('hidden');
}


// 5. below is an event handler for the 'cancel' button in the modal window + selection of 'OK' button

const cancelButton = document.getElementById('cancel__button');
cancelButton.addEventListener('click', hideModalVisibility);

const okButton = document.getElementById('ok__button');



// 6. below is a function that handles the quiz start

const finishTestButton = document.getElementById('finish-test-button');

const startQuiz = function () {
    addQuestionButton.disabled = true;
    startQuizButton.disabled = true;
    finishTestButton.disabled = false;
    constructQuestionSections(questionSet);

}

// 7. below is the event handler for 'Start the quiz' button

const startQuizButton = document.getElementById('start-quiz');
startQuizButton.addEventListener('click', startQuiz);

// 8. below is a function that checks what type of result did the user acheive.

const determineResult = function (someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed) {

    if (someQuestionsUnanswered) {
        console.log('есть неотвеченные');
        constructModalWindow(systemMessages['T2'], systemMessages['CC4'], false);
        
    } else if (amountOfQuestionsPassed === questionSet.length) {
        console.log('всё правильно');
        constructModalWindow(systemMessages['T1'], systemMessages['CC5'](amountOfQuestionsPassed), false);
        
    } else {
        constructModalWindow(systemMessages['T3'], systemMessages['CC7'](amountOfQuestionsPassed, questionsNotPassed), false);
        
    }
    showModalVisibility(false);
}

// 9. below is a function that wraps up the test and compares the result

const compareTheArrays = function(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
}

const finishTestFunction = function () {

    let amountOfQuestionsPassed = 0;
    let someQuestionsUnanswered = false;
    let questionsNotPassed = [];

    // below is a part of function that creates arrays of checkboxes that were checked at the time of pressing the 'Finish the test button' 

    for (let i = 0; i < questionSet.length; i++) {
        let checkboxSet = document.querySelectorAll('.checkbox-question-' + i);
        let checkmarkedBoxes = [];

        for (let j = 0; j < questionSet[i]['answers'].length; j++) {
            if (checkboxSet[j].checked) {
                checkmarkedBoxes.push(j);
            }
        }

        if (compareTheArrays(questionSet[i]['correct'], checkmarkedBoxes)) {
            questionSet[i]['passed'] = true;
            console.log(checkmarkedBoxes + ' = ' + questionSet[i]['correct']);
            amountOfQuestionsPassed++;
        } else if (!checkmarkedBoxes.length) {
            someQuestionsUnanswered = true;
            console.log(someQuestionsUnanswered);
        } else {
            questionSet[i]['passed'] = false;
            questionsNotPassed.push(i);
        }

    }
    determineResult(someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed);

}

// 10. below is the event handler for 'Finish the test' button

finishTestButton.addEventListener('click', finishTestFunction);


// 11. below is the function that generates new questions from the modal window into questionSet array

let stepNumber;

const addQuestion = function () {
    stepNumber = 0;
    newQuestion = {
        question: '',
        answers: [],
        correct: []
    }
    constructModalWindow(systemMessages['T4'], false, true);

    showModalVisibility(true);
}


// 12. below is an event handler for the 'add a question button'

const addQuestionButton = document.getElementById('add-question');
addQuestionButton.addEventListener('click', addQuestion);


// 13. below is an event handler for the 'OK' button


 // 13.1 digits for steps of the function are included in an object to imprive readability of the function

 const STEPS = {
	ENTER_QUESTION: 0,
	ENTER_1ST_ANSWER: 1,
	ENTER_2ND_ANSWER: 2,
	ENTER_3RD_ANSWER: 3,
	ENTER_4TH_ANSWER: 4,
	ENTER_CORRECT_ANSWERS: 5
}




okButton.addEventListener('click', function () {
    if (!modalInput.value) { // this condition handles empty input field. Depending on the step of the question creation process it will add different notifications from the system messages list
        switch (stepNumber) {
            case STEPS.ENTER_QUESTION:
                constructModalWindow(systemMessages['T5'], systemMessages['CC1'], false);
                okButton.classList.add('hidden');
                break;
            case STEPS.ENTER_1ST_ANSWER:
            case STEPS.ENTER_2ND_ANSWER:
            case STEPS.ENTER_3RD_ANSWER:
            case STEPS.ENTER_4TH_ANSWER:                    
                constructModalWindow(systemMessages['T5'], systemMessages['CC2'](stepNumber), false);
                okButton.classList.add('hidden');
                break;
            case STEPS.ENTER_CORRECT_ANSWERS:
                constructModalWindow(systemMessages['T5'], systemMessages['CC3'], false);
                okButton.classList.add('hidden');
                break;
        }

        
    } else {  // this condition handles valid entries to the textarea
        switch (stepNumber) {
            case STEPS.ENTER_QUESTION: // this step adds the question
                newQuestion['question'] = modalInput.value;
                stepNumber++;
                constructModalWindow(systemMessages['T6'](stepNumber), systemMessages['CC8'], true);
                break;
            case STEPS.ENTER_1ST_ANSWER:
            case STEPS.ENTER_2ND_ANSWER:
            case STEPS.ENTER_3RD_ANSWER: // these steps add all but the last answer
                newQuestion.answers[stepNumber - 1] = modalInput.value;
                stepNumber++;
                constructModalWindow(systemMessages['T6'](stepNumber), systemMessages['CC9'], true);
                break;
            case STEPS.ENTER_4TH_ANSWER: // last answer is added here
                newQuestion.answers[stepNumber - 1] = modalInput.value;
                stepNumber++;
                constructModalWindow(systemMessages['T7'], systemMessages['CC10'], true);

                break;
            case STEPS.ENTER_CORRECT_ANSWERS: // list of correct answers are added here
                let isCorrectOk = /^[1-4](,[1-4]){0,3}$/.test(modalInput.value); //validation of correct answers input
                if (isCorrectOk) {
                    newQuestion.correct = modalInput.value.split(',');
                    newQuestion.correct = newQuestion['correct'].map(function(v) { return Number(v); });
                    let noRepeatsSet = new Set(newQuestion.correct);
                    newQuestion.correct = [...noRepeatsSet];
                    newQuestion.correct = newQuestion['correct'].sort(); // these lines redo string of 1 to 4 divided by a comma into a sorted numbers array after ensuring that no repeated numbers were included
                    for (let i = 0; i < newQuestion.correct.length; i++) {
                        newQuestion.correct[i] = newQuestion.correct[i] - 1;
                    }
                    hideModalVisibility();
                    questionSet.push(newQuestion);
                } else {
                    constructModalWindow(systemMessages['T5'], systemMessages['CC6'], false); // this shows an error if user included wrong symbols in the correct answers string 
                    okButton.classList.add('hidden');
                }
                break;
        }       
    }
})