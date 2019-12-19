import Question from './Question';

interface IUser {
	id: string;
password: string;
	personalData: {
		firstName: string;
		lastName: string;
		email: string;
		progLanguages: string[];
		workingPosition: string;
		workExperience: string;
	};
	questions: Array<Question>;
	rating: {
		questionsTotal: number;
		answersTotal: number;
		answersAcceptedByOthers: number;
		answersLikedByOthers: number;
	};
}

class User implements IUser {
	id: string = Math.random().toString().slice(5, 15);
password = '';
	personalData = {
		firstName: '',
		lastName: '',
		email: '',
		progLanguages: [],
		workingPosition: '',
		workExperience: ''
	};
	questions: Array<Question> = [];
	rating = {
		questionsTotal: 0,
		answersTotal: 0,
		answersAcceptedByOthers: 0,
		answersLikedByOthers: 0
	};
}

export default User;
