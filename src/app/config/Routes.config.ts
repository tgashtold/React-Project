class RoutesConfig {
    static routes = {
        mainPage: '/',
        questionsList: '/questions',
        questionsList_tag: '/questions/:tag',
        questionsList_search: '/questions/search?q=:request',
        registration: '/registration',
        userInfo: '/user/:id',
        createQuestion: '/question/create',
        answers: '/question/:id',
        error: '/error'
    };
}

export default RoutesConfig;
