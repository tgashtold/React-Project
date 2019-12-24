import React from 'react';
import {TagsInput, User} from '../../../modules/users';
import {IUser} from '../../../modules/users/user.model';
import {
    InputEmail,
    InputPassword,
    InputText,
    InputNumber,
    ButtonLink,
    InputLabelWrapper
} from '../../../modules/common';
import {RouteService} from '../../../services';
import {IChangedEventArgs, Button} from '../../../modules/common';


interface IRegistrationFormProps {
    onSubmit: (user: IUser) => void;
    user: IUser;
    formBtnTitle: string;
    insertValue?: boolean;
    formSpecificClassName?: string;
    labelSpecificClassName?: string;
    inputBoxSpecificClassName?: string;
    tagsInputSpecificClassName?: string;
    btnSpecificClassName?: string;
    passwordFieldClassName?: string;
}

interface IRegistrationFormState {
    areProgLanguages: boolean;
    progLanguagesValue: Array<string>;
    isErrorMessage: boolean
}

export class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationFormState | any> {
    model: IUser= this.props.user;
    errorMessageForRegisterBtn: string = '';

    protected inputsNames = {
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'UserEmail',
        password: 'UserPassword',
        workPosition: 'WorkPosition',
        workExperience: 'WorkExperience'
    };
    protected requiredFieldsNames = [
        this.inputsNames.firstName,
        this.inputsNames.lastName,
        this.inputsNames.email,
        this.inputsNames.password
    ];
    protected notRequiredFieldsNames = [this.inputsNames.workExperience, this.inputsNames.workPosition];

    constructor(props: IRegistrationFormProps) {
        super(props);
        this.state = {
            isErrorMessage: false,
            [this.inputsNames.email]: {
                isValid: this.model.personalData.email.length > 0,
                value: this.props.insertValue ? this.model.personalData.email : ''
            },
            [this.inputsNames.password]: {
                isValid: this.model.password.length > 0,
                value: this.props.insertValue ? this.model.password : ''
            },
            [this.inputsNames.firstName]: {
                isValid: this.model.personalData.firstName.length > 0,
                value: this.props.insertValue ? this.model.personalData.firstName : ''
            },
            [this.inputsNames.lastName]: {
                isValid: this.model.personalData.lastName.length > 0,
                value: this.props.insertValue ? this.model.personalData.lastName : ''
            },
            [this.inputsNames.workExperience]: {
                isValid: this.model.personalData.workExperience.length > 0,
                value: this.props.insertValue ? this.model.personalData.workExperience : ''
            },
            [this.inputsNames.workPosition]: {
                isValid: this.model.personalData.workingPosition.length > 0,
                value: this.props.insertValue ? this.model.personalData.workingPosition : ''
            },
            areProgLanguages: this.model.personalData.progLanguages.length > 0,
            progLanguagesValue: this.model.personalData.progLanguages
        };
    }

    getEnteredProgLanguages = (progLanguages: Array<string>) => {
        const areEntered: boolean = progLanguages.length > 0;
        this.setState({progLanguagesValue: progLanguages, areProgLanguages: areEntered});
    };

    areFieldsCorrectlyFilled = (): boolean => {
        const areRequiredFieldsCorrectlyFilled: boolean = this.requiredFieldsNames.every(
            (name: string) => this.state[`${name}`].isValid
        );
        const areNotRequiredFieldsCorrectlyFilled = this.notRequiredFieldsNames.every((name: string) => {
            const isCorrectValue: boolean =
                this.state[`${name}`].isValid && this.state[`${name}`].value && this.state[`${name}`].value.length > 0;
            const isNoValue: boolean = !this.state[`${name}`].isValid && !this.state[`${name}`].value;
            return isCorrectValue || isNoValue;
        });

        return areRequiredFieldsCorrectlyFilled && areNotRequiredFieldsCorrectlyFilled && this.state.areProgLanguages;
    };

    handleBtnClick = () => {
        
        if (this.areFieldsCorrectlyFilled()) {
            this.setState({isErrorMessage:true});
            this.errorMessageForRegisterBtn = '';
              } else {
            this.setState({isErrorMessage:false});
            this.errorMessageForRegisterBtn =
                'Please fill in all the fields with correct values. Fields marked with * are obligatory';
        }
    };

    handleFromSubmit=(event: React.FormEvent)=>{
        event.preventDefault();

    if (this.areFieldsCorrectlyFilled()) {
    const fieldsNamesObj = this.inputsNames;

    this.model.password = this.state[`${fieldsNamesObj.password}`].value;
    this.model.personalData.firstName = this.state[`${fieldsNamesObj.firstName}`].value;
    this.model.personalData.lastName = this.state[`${fieldsNamesObj.lastName}`].value;
    this.model.personalData.email = this.state[`${fieldsNamesObj.email}`].value;
    this.model.personalData.progLanguages = this.state.progLanguagesValue as any;
    this.model.personalData.workingPosition = this.state[`${fieldsNamesObj.workPosition}`].value;
    this.model.personalData.workExperience = this.state[`${fieldsNamesObj.workExperience}`].value;

    this.props.onSubmit(this.model);   }
};
    inputChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    render() {
        return (
            <form onSubmit={(e)=>this.handleFromSubmit(e)}  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                }}
                className={`registration-form ${this.props.formSpecificClassName
                    ? this.props.formSpecificClassName
                    : ''}`}
            >
                <InputLabelWrapper
                    isRequiredField={true}
                    labelText={'First name'}
                    labelSpecificClassName={this.props.labelSpecificClassName || ''}
                >
                    <InputText
                        value={this.state[`${this.inputsNames.firstName}`].value}
                        placeholderValue={'Enter your first name'}
                        inputBoxClassName={this.props.inputBoxSpecificClassName || ''}
                        name={this.inputsNames.firstName}
                        onChanged={this.inputChangesHandler}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    isRequiredField={true}
                    labelSpecificClassName={this.props.labelSpecificClassName ? this.props.labelSpecificClassName : ''}
                    labelText={'Last name'}
                >
                    <InputText
                        value={this.state[`${this.inputsNames.lastName}`].value}
                        name={this.inputsNames.lastName}
                        onChanged={this.inputChangesHandler}
                        placeholderValue={'Enter your last name'}
                        inputBoxClassName={this.props.inputBoxSpecificClassName || ''}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    isRequiredField={true}
                    labelSpecificClassName={this.props.labelSpecificClassName || ''}
                    labelText={'E-mail'}
                >
                    <InputEmail
                        inputBoxClassName={this.props.inputBoxSpecificClassName || ''}
                        name={this.inputsNames.email}
                        value={this.state[`${this.inputsNames.email}`].value}
                        onChanged={this.inputChangesHandler}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    isRequiredField={true}
                    labelSpecificClassName={this.props.labelSpecificClassName || ''}
                    labelText={'Preferred programming languages'}
                >
                    <TagsInput
                        tags={this.state.progLanguagesValue}
                        sendTags={this.getEnteredProgLanguages}
                        inputClass={this.props.tagsInputSpecificClassName || ''}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    isRequiredField={false}
                    labelSpecificClassName={this.props.labelSpecificClassName || ''}
                    labelText={'Working position'}
                >
                    <InputText
                        name={this.inputsNames.workPosition}
                        onChanged={this.inputChangesHandler}
                        placeholderValue={'Enter your position'}
                        value={this.state[`${this.inputsNames.workPosition}`].value}
                        inputBoxClassName={this.props.inputBoxSpecificClassName || ''}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    labelSpecificClassName={this.props.labelSpecificClassName || ''}
                    isRequiredField={false}
                    labelText={'Work experience'}
                >
                    <InputNumber
                        onChanged={this.inputChangesHandler}
                        name={this.inputsNames.workExperience}
                        placeholderValue={'Enter your years of experience'}
                        inputBoxClassName={this.props.inputBoxSpecificClassName || ''}
                        value={this.state[`${this.inputsNames.workExperience}`].value}
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    labelSpecificClassName={this.props.passwordFieldClassName || ''}
                    isRequiredField={true}
                    labelText={'Password'}
                >
                    <InputPassword
                        value={this.state.passwordValue}
                        onChanged={this.inputChangesHandler}
                        name={this.inputsNames.password}
                    />
                </InputLabelWrapper>
                <span className="error-message">{this.errorMessageForRegisterBtn}</span>
                <Button
                    btnSpecificClassName={this.props.btnSpecificClassName || ''}
                    clickHandler={this.handleBtnClick}
                    disabled={false}
                    buttonTitle={this.props.formBtnTitle}
                />
            </form>
        );
    }
}

