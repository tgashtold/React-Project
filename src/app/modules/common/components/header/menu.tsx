import React from 'react';
import {NavLink} from 'react-router-dom';
import RoutesConfig from '../../../../config/Routes.config';

export const Menu = () => {
    return (
        <menu className="menu">
            <NavLink activeClassName="active" exact={true} className="menu__item" to={RoutesConfig.routes.mainPage}>
                Main
            </NavLink>
            <NavLink className="menu__item" to={RoutesConfig.routes.questionsList} activeClassName="active">
                Questions
            </NavLink>
        </menu>
    );
};
