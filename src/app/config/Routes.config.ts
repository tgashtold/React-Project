class RoutesConfig {
	static routes = {
		mainPage: '/',
		questionsList: '/questions',
		registration: '/registration',
		userInfo: '/user/:id',
		createQuestion: '/question/create',
		answers: '/question/:id',
		error: '/error'
	};
}

export default RoutesConfig;
