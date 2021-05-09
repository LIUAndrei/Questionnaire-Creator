// below is the list of default questions 

       // correct is the index of the correct answer within the array
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
              },
              
       ]



// below are the system and error messages list


       const systemMessages = {
            T1: 'Вы молодец',
            T2: 'Пропущены ответы',
            T3: 'Вы неправильно ответили на вопросы:',
              CC1: 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.',
              CC2: 'Вы не ввели текст N* варианта ответа. Попробуйте добавить вопрос заново.',
              CC3: 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.',
              CC4: 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.',
              CC5(amountOfQuestionsPassed) {
                return 'Ваш результат ' + amountOfQuestionsPassed +' из ' + defaultQuestions.length + ' . Вы молодец!';
              },
              CC6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.',
              CC7(amountOfQuestionsPassed, questionsNotPassed) {
                let questionListToDisplay = '';
                for (var i = 0; i < questionsNotPassed.length; i++) {
                    questionListToDisplay = questionListToDisplay + (questionsNotPassed[i]+1) + '. ' + defaultQuestions[questionsNotPassed[i]].question + ' <br> ';
                }
                questionListToDisplay = questionListToDisplay + 'Ваш результат ' + amountOfQuestionsPassed + ' из ' + defaultQuestions.length + '. ';
                return questionListToDisplay;
              }
 

       };

// below is a function that populates question section with questions

       const questionsGoHere = document.getElementById('questions-go-here');

       const questionsPopulator = function(arry) {
              for (let i = 0; i < arry.length; i++) {


                     let section = document.createElement('section');
                     section.classList.add('questions__container');
                     questionsGoHere.appendChild(section);

                     let header = document.createElement('h3');
                     header.classList.add('questions__title');
                     header.textContent = arry[i]['question'];
                     section.appendChild(header);

                     let questionsGridder = document.createElement('div');
                     questionsGridder.classList.add('questions__gridder');
                     section.appendChild(questionsGridder);

                     for (let j = 0; j < arry[i]['answers'].length; j++) {

                            let arrayOfAnswers = arry[i]['answers'];

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

// below questionsPopulator function is called for the default questions(disabled by default)

      // questionsPopulator(defaultQuestions);

// below is a function that engages and populates the modal window 

       // function should be provided with a title, message(false if none), and whether a textarea shoul be displayed(true or false)

       const constructModalWindow = function(title, message, textInput) {

            const modalHeader = document.getElementById('modal__header');
            modalHeader.textContent = title;

            const modalContent = document.getElementById('modal__content');
            if (message) {
                modalContent.textContent = message;
                modalContent.hidden = false;
            } else {
                modalContent.hidden = true;
            }

            const modalInput = document.getElementById('modal__input');
            if (textInput) {
                modalInput.hidden = false;
            } else {
                modalInput.hidden = true;
            }

            
       }


// below is the function that hides-shows the modal window

       let modalVisibility = function() {
              document.getElementById('modal').classList.toggle('hidden');
       }

// below is an event handler for the 'add a question button'

       const addAQuestionButton = document.getElementById('add-a-question');
       addAQuestionButton.addEventListener('click', modalVisibility);

// below is an event handler for the 'cancel' button in the modal window

       const cancelButton = document.getElementById('cancel__button');
       cancelButton.addEventListener('click', modalVisibility);



// below is a function that handles the quiz start

	const finishTheTestButton = document.getElementById('finish-the-test-button');

	const startTheQuizFunction = function() {
		addAQuestionButton.disabled = true;
		finishTheTestButton.disabled = false;
		questionsPopulator(defaultQuestions);
		
	}

// below is the event handler for 'Start the quiz' button

	const startTheQuizButton = document.getElementById('start-the-quiz');
	startTheQuizButton.addEventListener('click', startTheQuizFunction);	   

// below is a function that checks what type of result did the user acheive.

    const determineTheResult = function(someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed) {
        if (someQuestionsUnanswered) {
            console.log('есть неотвеченные');
            constructModalWindow(systemMessages['T2'], systemMessages['CC4'], false);
            modalVisibility();
        } else if (amountOfQuestionsPassed === defaultQuestions.length) {
            console.log('всё правильно');
            constructModalWindow(systemMessages['T1'], systemMessages.CC5(amountOfQuestionsPassed), false);
            modalVisibility();
        } else {
            constructModalWindow(systemMessages['T3'], systemMessages.CC7(amountOfQuestionsPassed, questionsNotPassed), false);
            modalVisibility();
            console.log(questionsNotPassed);
        }
    }

// below is a function that wraps up the test and compares the result

	const finishTheTestFunction = function() {

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
                console.log(checkmarkedBoxes + ' = ' + defaultQuestions[i]['correct'] );
                amountOfQuestionsPassed++;
            } else if(!checkmarkedBoxes.length) {
                someQuestionsUnanswered = true;
                console.log(someQuestionsUnanswered);
            } else {
                defaultQuestions[i]['passed'] = false;
                questionsNotPassed.push(i);
            }
            
        }
        determineTheResult(someQuestionsUnanswered, amountOfQuestionsPassed, questionsNotPassed);
		
	}

// below is the event handler for 'Finish the test' button

	finishTheTestButton.addEventListener('click', finishTheTestFunction); 

