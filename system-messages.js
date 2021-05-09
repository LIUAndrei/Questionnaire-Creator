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
        return 'Ваш результат ' + amountOfQuestionsPassed + ' из ' + defaultQuestions.length + ' . Вы молодец!';
    },
    CC6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.',
    CC7(amountOfQuestionsPassed, questionsNotPassed) {
        let questionListToDisplay = '';
        for (var i = 0; i < questionsNotPassed.length; i++) {
            questionListToDisplay = questionListToDisplay + (questionsNotPassed[i] + 1) + '. ' + defaultQuestions[questionsNotPassed[i]].question + ' <br> ';
        }
        questionListToDisplay = questionListToDisplay + 'Ваш результат ' + amountOfQuestionsPassed + ' из ' + defaultQuestions.length + '. ';
        return questionListToDisplay;
    }
};
