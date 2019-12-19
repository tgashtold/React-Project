

const Database: any = {
	users: [
		{
			id: '9586434820',
			password: 'fffFFF12345',
			personalData: {
				firstName: 'Tania',
				lastName: 'Gashtold',
				email: 'gashtold_tania@mail.ru',
				progLanguages: [ 'js' ],
				workingPosition: 'noo',
				workExperience: '5'
			},
			rating: {
				questionsTotal: 2,
				answersTotal: 6,
				answersAcceptedByOthers: 3,
				answersLikedByOthers: 2
			}
		}
	],

	questions: [
		{
			id: '9586567820',
			author: {
				id: '9586434820',
				password: 'fffFFF12345',
				personalData: {
					firstName: 'Tania',
					lastName: 'Gashtold',
					email: 'gashtold_tania@mail.ru',
					progLanguages: [ 'js' ],
					workingPosition: 'noo',
					workExperience: '5'
				},
				rating: {
					answersTotal: 6,
					answersAcceptedByOthers: 3,
					answersLikedByOthers: 2
				}
			},
			title: 'How to outline text11111',
			creationDate: new Date(),
			description: 'detailed1111111111111 description of the question',
			isClosed: false
		},
		{
			id: '9876567820',
			author: {
				id: '9586434820',
				password: 'fffFFF12345',
				personalData: {
					firstName: 'Tania',
					lastName: 'Gashtold',
					email: 'gashtold_tania@mail.ru',
					progLanguages: [ 'js' ],
					workingPosition: 'noo',
					workExperience: '5'
				},
				rating: {
					answersTotal: 6,
					answersAcceptedByOthers: 3,
					answersLikedByOthers: 2
				}
			},
			title: 'How to outline text2222222',
			creationDate: new Date(),
			description: 'detailed222222222222222 description of the question',
			isClosed: false
		}
	],

	answers: [{
		id: '9294667820',
		question: {
			id: '9586567820',
			author: {
				id: '9586434820',
				password: 'fffFFF12345',
				personalData: {
					firstName: 'Tania',
					lastName: 'Gashtold',
					email: 'gashtold_tania@mail.ru',
					progLanguages: [ 'js' ],
					workingPosition: 'noo',
					workExperience: '5'
				},
				rating: {
					answersTotal: 6,
					answersAcceptedByOthers: 3,
					answersLikedByOthers: 2
				}
			},
			title: 'How to outline text11111',
			creationDate: new Date(),
			description: 'detailed1111111111111 description of the question',
			isClosed: false
		},
		text: 'response to question 11111111111111111111111',
		author: 	{
			id: '9586434820',
			password: 'fffFFF12345',
			personalData: {
				firstName: 'Tania',
				lastName: 'Gashtold',
				email: 'gashtold_tania@mail.ru',
				progLanguages: [ 'js' ],
				workingPosition: 'noo',
				workExperience: '5'
			},
			rating: {
				answersTotal: 6,
				answersAcceptedByOthers: 3,
				answersLikedByOthers: 2
			}
		},
		creationDate: new Date(),
		isAccepted: false,
		likes: {quantity: 2,users:[]},
	}]
};

export default Database;
