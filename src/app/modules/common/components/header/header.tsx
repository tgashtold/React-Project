import React from 'react';
import {Logo} from './logo';
import {Menu} from './menu';
import {UserLogout} from '../../../users';

interface IHeader {

}

export class Header extends React.Component<IHeader> {
    render() {
        return (
            <header className="header">
                <Logo/>
                <Menu/>
                <div className="header__user">
                    <UserLogout/>
                </div>
            </header>
        );
    }
};

