import React from 'react';
import {InputLabelWrapper, TextArea, Button} from '../../common';
import {IChangedEventArgs} from '../../common';

interface IAnswerFormProps {
    onSubmit: (answerText: string) => void;
}

interface IAnswerFormState {

}

export class AnswerForm extends React.Component<IAnswerFormProps, IAnswerFormState | any> {
    textareaName: string = 'newAnswer';

    constructor(props: IAnswerFormProps) {
        super(props);
        this.state = {
            clearTextArea: false,
        };
    }

    handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const textareaState: IChangedEventArgs | undefined = this.state[this.textareaName];

        if (textareaState && textareaState.isValid) {

            this.props.onSubmit(this.state[this.textareaName].value);

        } else {
            this.setState({clearTextArea: false})
        }
    };

    textareaChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    render() {
        return (
            <div className="answer-form__wrapper">
                <form onSubmit={(e) => this.handleFormSubmit(e)}
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
                            name={this.textareaName}
                            specificAreaClassName={'question-description'}
                            rowsQty={9}
                            maxLength={800}
                            placeholderValue={'Enter your answer...'}
                            onChanged={this.textareaChangesHandler}
                        />
                    </InputLabelWrapper>
                    <Button disabled={this.state[this.textareaName] ? !this.state[this.textareaName].isValid : true}
                            buttonTitle={'Add answer'}/>
                </form>
            </div>
        );
    }
}


// interface IAnswerFormProps {
//     question: Question;
//     user: User;
//     addAnswer: () => void;
// }
//
// interface IAnswerFormState {
//     isAnswer: boolean;
//     answerValue: string;
//     user: User;
// }
//
// export class AnswerForm extends React.Component<IAnswerFormProps, IAnswerFormState> {
//     model: Answer = new Answer(this.props.user, this.props.question);
//
//
//     constructor(props: IAnswerFormProps) {
//         super(props);
//         this.state = {
//             isAnswer: false,
//             answerValue: '',
//             user: this.props.user,
//         };
//     }
//
//     isAnswerEntered = (value: boolean) => {
//         this.setState({isAnswer: value});
//     };
//
//     getAnswerValue = (answer: string) => {
//         this.setState({answerValue: answer});
//     };
//
//     handleAddBtnClick = () => {
//         this.model.text = this.state.answerValue;
//         const userToUpdate: User = this.state.user;
//         userToUpdate.rating.answersTotal = +1;
//         this.setState({user: userToUpdate})
//         AnswersApi.addAnswer(this.model);
//         UsersApi.changeUser(userToUpdate);
//         this.props.addAnswer();
//     };
//
//     render() {
//         return (
//             <div className="answer-form__wrapper">
//                 <form
//                     className="answer-form"
//                     onKeyPress={(event) => {
//                         if (event.key === 'Enter') {
//                             event.preventDefault();
//                         }
//                     }}
//                     action=""
//                 >
//                     <InputLabelWrapper
//                         labelSpecificClassName={'answer-form__title'}
//                         isRequiredField={false}
//                         labelText={'Add your answer'}
//                     >
//                         <TextArea
//                             isValid={this.isAnswerEntered}
//                             sendEnteredValue={this.getAnswerValue}
//                             specificaAreaClassName={'question-description'}
//                             rowsQty={9}
//                             maxLength={800}
//                             placeholderValue={'Enter your answer...'}
//                         />
//                     </InputLabelWrapper>
//                     <Button disabled={!this.state.isAnswer} clickHandler={this.handleAddBtnClick}
//                             buttonTitle={'Add answer'}/>
//                 </form>
//             </div>
//         );
//     }
// }


