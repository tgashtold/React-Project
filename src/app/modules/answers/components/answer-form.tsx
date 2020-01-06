import React from 'react';
import {Button, IChangedEventArgs, InputLabelWrapper, TextArea} from '../../common';
import {IAnswer} from '../answer.model';
import {IQuestionInfo} from '../../questions/question.model';
import {IUserInfo} from '../../users/user.model';

interface IAnswerFormProps {
    onSubmit: (newAnswer: IAnswer) => void;
    clearForm?: boolean;
}

interface IAnswerFormState {
}

export class AnswerForm extends React.Component<IAnswerFormProps, IAnswerFormState | any> {
    textareaName: string = 'newAnswer';

    constructor(props: IAnswerFormProps) {
        super(props);
        this.state = {};
    }

    handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const textareaState: IChangedEventArgs | undefined = this.state[this.textareaName];

        if (textareaState && textareaState.isValid) {
            const newAnswer: IAnswer = {
                id: '',
                question: {} as IQuestionInfo,
                text: this.state[this.textareaName].value,
                author: {} as IUserInfo,
                creationDate: new Date(),
                isAccepted: false
            };

            this.setState({
                [this.textareaName]: {
                    value: '',
                    isValid: false,
                    name: this.textareaName
                }
            });
            this.props.onSubmit(newAnswer);
        }
    };

    textareaChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    render() {
        return (
            <div className="answer-form__wrapper">
                <form
                    onSubmit={(e) => this.handleFormSubmit(e)}
                    className="answer-form"
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                    }}
                    action=""
                >
                    <InputLabelWrapper
                        labelSpecificClassName={'answer-form__title'}
                        isRequiredField={false}
                        labelText={'Add your answer'}
                    >
                        <TextArea
                            clear={this.props.clearForm}
                            name={this.textareaName}
                            specificAreaClassName={'question-description'}
                            rowsQty={9}
                            maxLength={800}
                            placeholderValue={'Enter your answer...'}
                            onChanged={this.textareaChangesHandler}
                        />
                    </InputLabelWrapper>
                    <Button
                        disabled={this.state[this.textareaName]
                            ? !this.state[this.textareaName].isValid
                            : true
                        }
                        buttonTitle={'Add answer'}
                    />
                </form>
            </div>
        );
    }
}
