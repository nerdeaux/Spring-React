import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import AuthenticationService from './AuthenticationService.js';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return(
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div><a href='http://www.example.com' target='_blank' rel="noopener noreferrer" className='navbar-brand'>Example Page</a></div>
                    <ul className='navbar-nav'>
                        <li>
                            {isUserLoggedIn && <NavLink activeStyle={{borderBottom: '2px solid red'}} to='/welcome/caylemh' className='nav-link'>Home</NavLink>}
                        </li>
                        <li>
                            {isUserLoggedIn && <NavLink activeStyle={{borderBottom: '2px solid red'}} to='/todos' className='nav-link'>Todo List</NavLink>}
                        </li>
                    </ul>
                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        <li>
                            {!isUserLoggedIn && <NavLink activeStyle={{borderBottom: '2px solid red'}} to='/login' className='nav-link'>Login</NavLink>}
                        </li>
                        <li>
                            {isUserLoggedIn && <NavLink activeStyle={{borderBottom: '2px solid red'}} to='/logout' className='nav-link' onClick={AuthenticationService.logout}>
                                Logout
                            </NavLink>} 
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);