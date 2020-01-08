import React from 'react';
import {RegistrationForm, userActions} from '../modules/users';
import {IUser, IUserInfo} from '../modules/users/user.model';
import {FormWrapper, Loader} from '../modules/common';
import {connect} from 'react-redux';
import {IAppState} from '../state';
import {RouteService} from '../services';
import {Redirect} from 'react-router-dom';

interface IRegistrationStateProps {
    user: IUserInfo | null;
    registrationError: string;
    isRegistrationProcess: boolean;
}

interface IRegistrationDispatchProps {
    createUser: (newUser: IUser) => any;
}

interface IRegistrationProps extends IRegistrationStateProps, IRegistrationDispatchProps {
}

interface IRegistrationState {
}

class Registration extends React.Component<IRegistrationProps, IRegistrationState> {
    handleFormSubmit = (user: IUser) => {
        this.props.createUser(user);
    };

    render() {
        if (this.props.user) {
            return <Redirect to={`${RouteService.getPathToUserInfoPage()}${this.props.user.id}`}/>;
        }

        return (
            <FormWrapper formTitle={'Registration form'}>
                <Loader isActive={this.props.isRegistrationProcess}>
                    <RegistrationForm
                        errorText={this.props.registrationError}
                        onSubmit={this.handleFormSubmit}
                        formBtnTitle={'Register'}
                    />
                </Loader>
            </FormWrapper>
        );
    }
}

const mapDispatchToProps = (dispatch: any): IRegistrationDispatchProps => {
    return {
        createUser: (newUser: IUser) => dispatch(userActions.createUser.call(newUser))
    };
};

const mapStateToProps = (state: IAppState): IRegistrationStateProps => {
    return {
        user: state.user.user,
        registrationError: state.user.registrationError,
        isRegistrationProcess: state.user.isUserCreating
    };
};

export const RegistrationPage = connect(mapStateToProps, mapDispatchToProps)(Registration);
