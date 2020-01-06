class RoutesConfig {
    static routes = {
        mainPage: '/',
        questionsList: '/questions',
        questionsListTag: '/questions/:tag',
        questionsListSearch: '/questions/search?q=:request',
        registration: '/registration',
        userInfo: '/user/:id',
        createQuestion: '/question/create',
        answers: '/question/:id',
        error: '/error'
    };
}

export default RoutesConfig;
