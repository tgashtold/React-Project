import React from 'react';
import {
    Button,
    IChangedEventArgs,
    InputEmail,
    InputLabelWrapper,
    InputNumber,
    InputPassword,
    InputTags,
    InputText
} from '../../../modules/common';
import {IUser, IUserInfo} from '../../../modules/users/user.model';

interface IRegistrationFormProps {
    onSubmit: (user: IUser) => void;
    formBtnTitle: string;
    user?:  IUser| IUserInfo |null;
    registrationProcess?: boolean;
    errorText?: string;
    insertValue?: boolean;
    formSpecificClassName?: string;
    passwordFieldClassName?: string;
}

interface IRegistrationFormState {
    errorMessage: string;
}

export class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationFormState | any> {
    protected inputsNames = {
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'UserEmail',
        password: 'UserPassword',
        workPosition: 'WorkPosition',
        workExperience: 'WorkExperience',
        progLanguages: 'ProgLanguages'
    };
    protected requiredFieldsNames = [
        this.inputsNames.firstName,
        this.inputsNames.lastName,
        this.inputsNames.email,
        this.inputsNames.password,
        this.inputsNames.progLanguages
    ];
    protected notRequiredFieldsNames = [this.inputsNames.workExperience, this.inputsNames.workPosition];

    constructor(props: IRegistrationFormProps) {
        super(props);
        this.state = {
            errorMessage: '',
            [this.inputsNames.email]: {
                isValid: !!this.props.insertValue && !!this.props.user,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.email : ''
            },
            [this.inputsNames.password]: {
                isValid: !this.props.registrationProcess,
                value: ''
            },
            [this.inputsNames.firstName]: {
                isValid: !!this.props.insertValue && !!this.props.user,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.firstName : ''
            },
            [this.inputsNames.lastName]: {
                isValid: !!this.props.insertValue && !!this.props.user,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.lastName : ''
            },
            [this.inputsNames.workExperience]: {
                isValid:
                    this.props.insertValue && this.props.user
                        ? this.props.user.personalData.workExperience.length > 0
                        : false,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.workExperience : ''
            },
            [this.inputsNames.workPosition]: {
                isValid:
                    this.props.insertValue && this.props.user
                        ? this.props.user.personalData.workingPosition.length > 0
                        : false,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.workingPosition : ''
            },
            [this.inputsNames.progLanguages]: {
                isValid:
                    this.props.insertValue && this.props.user
                        ? this.props.user.personalData.progLanguages.length > 0
                        : false,
                value: this.props.insertValue && this.props.user ? this.props.user.personalData.progLanguages : []
            }
        };
    }

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

        return areRequiredFieldsCorrectlyFilled && areNotRequiredFieldsCorrectlyFilled;
    };

    handleBtnClick = () => {
        if (this.areFieldsCorrectlyFilled()) {
            this.setState({errorMessage: ''});
        } else {
            this.setState({
                errorMessage: 'Please fill in all the fields with correct values. Fields marked with * are obligatory'
            });
        }
    };

    handleFromSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (this.areFieldsCorrectlyFilled()) {
            const fieldsNamesObj = this.inputsNames;
            const newUser: IUser = {
                password: this.state[`${fieldsNamesObj.password}`].value,
                personalData: {
                    firstName: this.state[`${fieldsNamesObj.firstName}`].value,
                    lastName: this.state[`${fieldsNamesObj.lastName}`].value,
                    email: this.state[`${fieldsNamesObj.email}`].value,
                    progLanguages: this.state[`${fieldsNamesObj.progLanguages}`].value as any,
                    workingPosition: this.state[`${fieldsNamesObj.workPosition}`].value,
                    workExperience: this.state[`${fieldsNamesObj.workExperience}`].value
                }
            };

            this.props.onSubmit(newUser);
        }
    };

    inputChangesHandler = (requiredData: IChangedEventArgs): void => {
        this.setState({[`${requiredData.name}`]: requiredData});
    };

    render() {
        return (
            <form
                onSubmit={(e) => this.handleFromSubmit(e)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                }}
                className={`registration-form ${this.props.formSpecificClassName
                    ? this.props.formSpecificClassName
                    : ''}`}
            >
                <InputLabelWrapper isRequiredField={true} labelText={'First name'}>
                    <InputText
                        value={this.state[`${this.inputsNames.firstName}`].value}
                        placeholderValue={'Enter your first name'}
                        name={this.inputsNames.firstName}
                        onChanged={this.inputChangesHandler}
                    />
                </InputLabelWrapper>

                <InputLabelWrapper isRequiredField={true} labelText={'Last name'}>
                    <InputText
                        value={this.state[`${this.inputsNames.lastName}`].value}
                        name={this.inputsNames.lastName}
                        onChanged={this.inputChangesHandler}
                        placeholderValue={'Enter your last name'}
                    />
                </InputLabelWrapper>

                <InputLabelWrapper isRequiredField={true} labelText={'E-mail'}>
                    <InputEmail
                        name={this.inputsNames.email}
                        value={this.state[`${this.inputsNames.email}`].value}
                        onChanged={this.inputChangesHandler}
                    />
                </InputLabelWrapper>

                <InputLabelWrapper isRequiredField={true} labelText={'Preferred programming languages'}>
                    <InputTags
                        name={this.inputsNames.progLanguages}
                        tags={this.state[`${this.inputsNames.progLanguages}`].value}
                        onChanged={this.inputChangesHandler}
                    />
                </InputLabelWrapper>

                <InputLabelWrapper isRequiredField={false} labelText={'Working position'}>
                    <InputText
                        name={this.inputsNames.workPosition}
                        onChanged={this.inputChangesHandler}
                        placeholderValue={'Enter your position'}
                        value={this.state[`${this.inputsNames.workPosition}`].value}
                    />
                </InputLabelWrapper>

                <InputLabelWrapper isRequiredField={false} labelText={'Work experience'}>
                    <InputNumber
                        onChanged={this.inputChangesHandler}
                        name={this.inputsNames.workExperience}
                        placeholderValue={'Enter your years of experience'}
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

                <span className="error-message">{this.state.errorMessage || this.props.errorText || ''}</span>
                <Button clickHandler={this.handleBtnClick} disabled={false} buttonTitle={this.props.formBtnTitle}/>
            </form>
        );
    }
}
