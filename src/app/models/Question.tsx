import User from './User';

interface IQuestion{
  id: string;
  author: User;
  title: string;
  creationDate: Date;
  description: string;
  isClosed: boolean;
}

class Question implements IQuestion{
  id: string = Math.random().toString().slice(5, 15);
  author: User;
  title: string ='';
  creationDate: Date = new Date();
  description: string = '';
  isClosed: boolean = false;

  constructor(author: User){
		this.author = author;
		}
}

export default Question;