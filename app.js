// below is the list of default questions 

       // correct is the index of the correct answer within the array
       const defaultQuestions = [
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

// below is the empty array of new questions that will be filled out by the user

       let userQuestionsList = [];

// below are the system and error messages list

       const systemMessages = {
              CC1: 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.',
              CC2: 'Вы не ввели текст N* варианта ответа. Попробуйте добавить вопрос заново.',
              CC3: 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.',
              CC4: 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.',
              CC5: 'Ваш результат <количество правильно отвеченных вопросов> из <количество всех вопросов>. Вы молодец!',
              CC6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.',
              // CC7: 'Вы неправильно ответили на вопросы:
              // <N*>. <Вопрос N>
              // <M*>. <Вопрос M>
              // Ваш результат <количество правильно отвеченных вопросов> из <количество всех вопросов>.
              // *N, *M — номер вопроса.'

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
                            checkbox.type = 'checkbox';
                            checkbox.disabled = true;
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

// below questionsPopulator function is called for the default questions

       questionsPopulator(defaultQuestions);

// below is a function that engages and populates the modal window 
       // function should be provided with a title, message(false if none), and whether a textarea shoul be displayed(true or false)

       const modalWindow = function(title, message, textInput) {
              
              
       }


// below is the function that hides-shows the modal window

       let modalVisibility = function() {
              document.getElementById('modal').classList.toggle('hidden');
       }

// below is an event handler for the 'add a question button'

       const addAQuestionButton = document.getElementById('add-a-question');
       addAQuestionButton.addEventListener('click', modalVisibility);

