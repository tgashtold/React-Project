import React from 'react';
import {InputLabelWrapper, TextArea, Button,FormWrapper} from '../../common';
import {User, UsersApi} from '../../users';
import {Question, QuestionsApi} from '../../questions';
import {RouteService} from '../../../services/route-service';
import {LSService} from '../../../services/LS-service';
import {IChangedEventArgs} from '../../common';

interface IQuestionFormProps {
    onSubmit: (title: string, description: string)=> void;
}

interface IQuestionFormState {
  isErrorMessage: boolean
}

export class QuestionForm extends React.Component<IQuestionFormProps, IQuestionFormState | any> {
    protected errorMessageForRegisterBtn: string = '';
    protected textareaNames = {questionTitle: 'questionTitle',
    questionDescription:'questionDescription'}

    constructor(props: any) {
        super(props);
        this.state = {
            isErrorMessage:false,
        };
    }

    areFieldsCorrectlyFilled = (): boolean => {
        const titleState: IChangedEventArgs| undefined = this.state[this.textareaNames.questionTitle];
        const descriptionState: IChangedEventArgs| undefined  = this.state[this.textareaNames.questionDescription];
        const areCorrectlyFilled = !!titleState && !!descriptionState && titleState.isValid && descriptionState.isValid;

        return areCorrectlyFilled;
    };

    textareaChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    handleBtnClick = () => {
        if (this.areFieldsCorrectlyFilled()) {
            this.setState({isErrorMessage: false})
            this.errorMessageForRegisterBtn = '';

            // const question: Question = this.state.model;
            //
            // question.title = this.state.questionTitle;
            // question.description = this.state.questionDescription;
            //
            // QuestionsApi.addQuestion(question);
            //
            // const questionAuthor: User = this.state.user;
            //
            // questionAuthor.rating.questionsTotal = +1;
            //
            // UsersApi.changeUser(questionAuthor);
            // this.setState({user: questionAuthor, model: question,
            //     showErrorMessage: false});
            // RouteService.redirectToAnswersPage(question.id);

        } else {
            this.setState({isErrorMessage: true})
            this.errorMessageForRegisterBtn = 'Please fill in all the fields.';
        }
    };

    handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const titleState: IChangedEventArgs| undefined = this.state[this.textareaNames.questionTitle];
        const descriptionState: IChangedEventArgs| undefined  = this.state[this.textareaNames.questionDescription];

        if (titleState && descriptionState && this.areFieldsCorrectlyFilled()) {
            this.props.onSubmit(titleState.value, descriptionState.value);
        }
    };

    render() {
        return (
          <form onSubmit={(e)=> this.handleFormSubmit(e)} className="registration-form" action="">
                    <InputLabelWrapper isRequiredField={true} labelText={'Title'}>
                        <TextArea
                        onChanged={this.textareaChangesHandler}
                        name={this.textareaNames.questionTitle}
                            specificAreaClassName={'question-title'}
                            rowsQty={3}
                            maxLength={130}
                            placeholderValue={'Enter short question title'}
                        />
                    </InputLabelWrapper>

                    <InputLabelWrapper isRequiredField={true} labelText={'Description'}>
                        <TextArea
                            onChanged={this.textareaChangesHandler}
                            name={this.textareaNames.questionDescription}
                            specificAreaClassName={'question-description'}
                            rowsQty={9}
                            maxLength={800}
                            placeholderValue={'Enter question details'}
                        />
                    </InputLabelWrapper>
                    <span className="error-message">{this.errorMessageForRegisterBtn}</span>
                    <Button
                        clickHandler={this.handleBtnClick}
                        buttonTitle={'Create'}
                    />
                </form>

        );
    }
}