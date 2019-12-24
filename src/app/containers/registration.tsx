import React from 'react';
import {RegistrationForm, User, UsersApi, createUser} from '../modules/users';
import {IUser} from '../modules/users/user.model';
import {IPersonalInfo} from '../modules/users/user.model';
import {LSService} from '../services/LS-service';
import {FormWrapper} from '../modules/common';
import {RouteService} from "../services";
import { connect } from 'react-redux';


interface IRegistrationProps {
    user: IUser;
    createUser: (password:string,personalInfo: IPersonalInfo)=> any
}

interface IRegistrationState {
    // user: IUser;
}

class Registration extends React.Component<IRegistrationProps, IRegistrationState> {
    // constructor(props: IRegistrationProps) {
    //     super(props);
    //     this.state = {
    //         user: this.props.user,
    //     };
    // }

    handleFormSubmit = (user:IUser) => {
        // this.setState({user: user});
               UsersApi.addUser(user as User);
        // LSService.addUserIdToLS(user.id);
        this.props.createUser(user.password, user.personalData);
       alert(this.props.user.personalData.firstName);
               RouteService.redirectToUserInfoPage(user.id);
    };

    render() {
        return (
            <FormWrapper formTitle={'Registration form'}>

                <RegistrationForm onSubmit={this.handleFormSubmit} user={this.props.user} formBtnTitle={'Register'}/>
            </FormWrapper>
        );
    }
}

const mapStateToProps = (store: any) => {
    return {
       user: store.user,
   }}

   const mapDispatchToProps = (dispatch: any) => {
    return {
       createUser: (password:string,personalInfo: IPersonalInfo) =>dispatch(createUser(password, personalInfo)),
   }}
const RegistrationPage = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default  RegistrationPage;
