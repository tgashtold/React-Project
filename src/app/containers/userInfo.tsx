import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from '../modules/common/components/button-link';
import RoutesConfig from '../config/Routes.config';
import User from '../models/User';
import Question from '../models/Question';
import RegistrationForm from '../modules/users/components/registration-form';
import UserPersonalInfo from '../modules/users/components/user-personal-info';
import UserQuestionsCollection from '../modules/questions/components/user-questions-collection';
import UserRating from '../modules/users/components/user-rating';
import UserInfoSection from '../modules/users/components/user-info-section';
import { UsersApi } from '../api/users.api';
import { QuestionsApi } from '../api/questions.api';
import { LSService } from '../services/LS-service';
import RouteService from '../services/route-service';
import { IQuestionAnswersObj } from '../Utils/Interfaces';
import { AnswersApi } from '../api/answers.api';

interface IUserInfoProps {}
interface IUserInfoState {
	user: User;
	userQuestions: Array<Question>;
	answersToUserQuestionsInfo: Array<IQuestionAnswersObj>;
	editPersonalInfo: boolean;
}

class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {
	constructor(props: IUserInfoProps) {
		super(props);
		this.state = {
			userQuestions: [],
			user: new User(),
			answersToUserQuestionsInfo: [],
			editPersonalInfo: false
		};
	}

	componentWillMount = () => {
		const userId = LSService.getUserIdFromLS();

		if (userId) {
			UsersApi.getUserById(userId).then((userFromDB: User) => this.setState({ user: userFromDB }));
			QuestionsApi.getQuestions()
				.then((questionsFromDB: Array<Question>) => {
					const userQuestionsFromDB = questionsFromDB.filter(
						(question: Question) => userId === question.author.id
					);
					this.setState({ userQuestions: userQuestionsFromDB });
					return questionsFromDB;
				})
				.then((questions: Array<Question>) => {
					AnswersApi.getQuestionAnswersInfoArr(
						questions
					).then((questionsAnswersObjArr: Array<IQuestionAnswersObj>) => {
						this.setState({ answersToUserQuestionsInfo: questionsAnswersObjArr });
					});
				});
		} else {
			RouteService.redirectToErrorPage();
		}
	};

	changeEditPersonalInfoMode = () => {
		this.setState({ editPersonalInfo: !this.state.editPersonalInfo });
	};

	handleBtnEditClick = () => {
		this.changeEditPersonalInfoMode();
	};

	render() {
		const editablePersonaInfo = (
			<RegistrationForm
				passwordFieldClassName={'hidden'}
				onSubmit={this.changeEditPersonalInfoMode}
				btnSpecificClassName={'edit-button'}
				tagsInputSpecificClassName={'user-info__input-wrapper'}
				formSpecificClassName={'user-info__form'}
				inputBoxSpecificClassName={'user-info__input-wrapper'}
				labelSpecificClassName={'user-info__list'}
				insertValue={true}
				user={this.state.user}
				formBtnTitle={'Save'}
			/>
		);
		const notEditablePersonalInfo = (
			<UserPersonalInfo user={this.state.user}>
				<ButtonLink clickHandler={this.handleBtnEditClick} buttonTitle={'Edit'} buttonRoute={'#'} />
			</UserPersonalInfo>
		);

		return (
			<div className="user-info">
				<UserInfoSection sectionTitle={'Personal information'}>
					{this.state.editPersonalInfo ? editablePersonaInfo : notEditablePersonalInfo}
				</UserInfoSection>

				<UserInfoSection sectionTitle={'My questions'}>
					<UserQuestionsCollection questionAnswersDetailsArr={this.state.answersToUserQuestionsInfo} />
					<Link className="button" to={RoutesConfig.routes.createQuestion}>
						Create new question
					</Link>
				</UserInfoSection>

				<UserInfoSection sectionTitle={'My questions'}>
					<UserRating user={this.state.user} />
				</UserInfoSection>
			</div>
		);
	}
}

export default UserInfo;
