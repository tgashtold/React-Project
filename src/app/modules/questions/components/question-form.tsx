import React from 'react';
import {InputLabelWrapper, TextArea, Button, InputTags} from '../../common';
import {IUserInfo} from '../../users/user.model';
import {IQuestion} from '../../questions/question.model';
import {IChangedEventArgs} from '../../common';

interface IQuestionFormProps {
    onSubmit: (question: IQuestion) => void;
}

interface IQuestionFormState {
    errorMessage: string;
}

export class QuestionForm extends React.Component<IQuestionFormProps, IQuestionFormState | any> {
    protected textareaNames = {
        questionTitle: 'questionTitle',
        questionDescription: 'questionDescription',
        topicTags: 'topicTags'
    };

    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: ''
        };
    }

    areFieldsCorrectlyFilled = (): boolean => {
        const titleState: IChangedEventArgs | undefined = this.state[this.textareaNames.questionTitle];
        const descriptionState: IChangedEventArgs | undefined = this.state[this.textareaNames.questionDescription];
        const areCorrectlyFilled = !!titleState && !!descriptionState && titleState.isValid && descriptionState.isValid;

        return areCorrectlyFilled;
    };

    textareaChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    handleBtnClick = () => {
        if (this.areFieldsCorrectlyFilled()) {
            this.setState({errorMessage: ''});
        } else {
            this.setState({errorMessage: 'Please fill in all the fields.'});
        }
    };

    handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();


        if (this.areFieldsCorrectlyFilled()) {
            const newQuestion: IQuestion = {
                id: '',
                author: {} as IUserInfo,
                title: this.state[this.textareaNames.questionTitle].value,
                creationDate: new Date(),
                hashTags: this.state[this.textareaNames.topicTags]
                    ? this.state[this.textareaNames.topicTags].value
                    :[],
                description: this.state[this.textareaNames.questionDescription].value,
                isClosed: false
            };
            this.props.onSubmit(newQuestion);
        }
    };

    render() {
        return (
            <form onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            }} onSubmit={(e) => this.handleFormSubmit(e)} className="registration-form" action="">
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

                <InputLabelWrapper isRequiredField={false} labelText={'Question topic hashtags'}>
                    <InputTags onChanged={this.textareaChangesHandler} name={this.textareaNames.topicTags} tags={[]}/>
                </InputLabelWrapper>

                <span className="error-message">{this.state.errorMessage}</span>
                <Button clickHandler={this.handleBtnClick} buttonTitle={'Create'}/>
            </form>
        );
    }
}
