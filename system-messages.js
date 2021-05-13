// below are the system and error messages list


const systemMessages = {

    T1: 'Вы молодец',
    T2: 'Пропущены ответы',
    T3: 'Вы неправильно ответили на вопросы:',
    T4: 'Введите текст вопроса',
    T5: 'Внимание!',
    T6(stepNumber) {
        return 'Ведите текст ' + stepNumber + ' варианта ответа';
    },
    T7: 'Введите номера правильных ответов через запятую. Нумерация начинается с 1.',
    T8: 'Отлично!',

    CC1: 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.',
    CC2(stepNumber) {
        return 'Вы не ввели текст ' + stepNumber + ' варианта ответа. Попробуйте добавить вопрос заново.'
    } ,
    CC3: 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.',
    CC4: 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.',
    CC5(amountOfQuestionsPassed) {
        return 'Ваш результат ' + amountOfQuestionsPassed + ' из ' + questionSet.length + ' . Вы молодец!';
    },
    CC6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.',
    CC7(amountOfQuestionsPassed, questionsNotPassed) {
        let questionListToDisplay = '';
        for (var i = 0; i < questionsNotPassed.length; i++) {
            questionListToDisplay = questionListToDisplay + (questionsNotPassed[i] + 1) + '. ' + questionSet[questionsNotPassed[i]].question + ' <br> ';
        }
        questionListToDisplay = questionListToDisplay + 'Ваш результат ' + amountOfQuestionsPassed + ' из ' + questionSet.length + '. ';
        return questionListToDisplay;
    
    },
    CC8: 'Вы ввели вопрос. Теперь введите 1 вариант ответа.',
    CC9: 'Вы ввели вариант ответа. Добавьте следующий вариант.',
    CC10: 'Вы ввели вариант ответа. Добавьте список верных ответов'
};
