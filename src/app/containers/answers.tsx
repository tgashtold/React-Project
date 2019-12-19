import React from 'react';
import User from '../models/User';
import Answer from '../models/Answer';
import Question from '../models/Question';
import AuthorShortInfo from '../modules/users/components/author-short-info';
import CreationDate from '../modules/common/components/creation-date';
import AnswersList from '../modules/answers/components/answers-list';
import AnswerForm from '../modules/answers/components/answer-form';
import Utils from '../Utils/Utils';
import { AnswersApi } from '../api/answers.api';
import { UsersApi } from '../api/users.api';
import { QuestionsApi } from '../api/questions.api';

interface IAnswersProps {}
interface IAnswersState {
	isAnyAnswerAccepted: boolean;
	totalAnswers: number;
	user: User | null;
	question: Question;
	answers: Array<Answer>;
}

class Answers extends React.Component<IAnswersProps, IAnswersState> {
	constructor(props: IAnswersState) {
		super(props);

		this.state = {
			user: null,
			question: new Question(new User()),
			answers: [],
			isAnyAnswerAccepted: false,
			totalAnswers: 0
		};
	}
	componentDidMount() {
		UsersApi.getUserById(Utils.getUserIdFromLS()).then((userFromDB: User) => this.setState({ user: userFromDB }));

		QuestionsApi.getQuestionById(Utils.getQuestionIdFromURl()).then((questionFromDB: Question) =>
			this.setState({ question: questionFromDB, isAnyAnswerAccepted: questionFromDB.isClosed })
		);

		AnswersApi.getAnswers().then((answersFromDB: Array<Answer>) => {
			const answersToQuestion: Array<Answer> = answersFromDB.filter(
				(answer: Answer) => this.state.question && this.state.question.id === answer.question.id
			);
			
			this.setState({ answers: answersToQuestion, totalAnswers: answersToQuestion.length });
		});
	}

	increaseAnswersCount = () => {
		const newAnswersNumber = this.state.totalAnswers + 1;

		this.setState({ totalAnswers: newAnswersNumber });
	};

	isAnswerAccepted = (value: boolean) => {
		this.setState({ isAnyAnswerAccepted: value });
	};

	render() {
		return (
			<div className="answers-box">
				<div className="question-details">
					<h1 className="question-details__title">{this.state.question.title}</h1>
					<div className="details">
						<AuthorShortInfo author={this.state.question.author} />
						<CreationDate date={this.state.question.creationDate} />
					</div>
					<div className="question-details__description">{this.state.question.description}</div>
				</div>
				<AnswersList answers={this.state.answers} user={this.state.user} isAccepted={this.isAnswerAccepted} />
				{this.state.user && !this.state.question.isClosed ? (
					<AnswerForm
						addAnswer={this.increaseAnswersCount}
						user={this.state.user}
						question={this.state.question}
					/>
				) : null}
			</div>
		);
	}
}

export default Answers;
