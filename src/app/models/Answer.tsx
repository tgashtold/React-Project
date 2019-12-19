import User from './User';
import Question from './Question';

interface IAnswer {
	id: string;
	question: Question;
	text: string;
	author: User;
	creationDate: Date;
	isAccepted: boolean;
	likes:{quantity:number,
	users: Array<any>} 
}

class Answer implements IAnswer {
	id: string = Math.random().toString().slice(5, 15);
	question: Question;
	text: string = '';
	author: User;
	creationDate: Date= new Date();
	isAccepted: boolean = false;
	likes = {quantity:0,
		users:[] as any};
	
	constructor(author: User, question: Question){
		this.author = author;
		this.question = question;
	}
  
}

export default Answer;
