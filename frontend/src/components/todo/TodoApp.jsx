import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.js';
import LoginComponent from './LoginComponent.jsx';
import ListTodoComponent from './ListTodoComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import TodoComponent from './TodoComponent';

export default class TodoApp extends Component {
    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                        <Switch>
                            <Route path='/' exact component={LoginComponent}/>
                            <Route path='/login' component={LoginComponent}/>
                            <AuthenticatedRoute path='/welcome/:name' component={WelcomeComponent}/>
                            <AuthenticatedRoute path='/todos/:id' component={TodoComponent}/>
                            <AuthenticatedRoute path='/todos' component={ListTodoComponent}/>
                            <AuthenticatedRoute path='/logout' component={LogoutComponent}/>
                            <Route path='' component={ErrorComponent}/>
                        </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}