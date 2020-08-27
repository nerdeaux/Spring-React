import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';


class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Enter User Name...',
            pswd: '**********',
            hasLoginFailed: false,
            showSuccessMsg: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.logonClick = this.logonClick.bind(this);
    }

    logonClick() {
        // if(this.state.username==='caylemh' && this.state.pswd==='dummy') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.pswd);
        //     this.props.history.push(`/welcome/${this.state.username}`);
        //     // this.setState({showSuccessMsg: true});
        //     // this.setState({hasLoginFailed: false});
        // } else {
        //     this.setState({showSuccessMsg: false});
        //     this.setState({hasLoginFailed: true});
        // }

        // AuthenticationService
        // .executeBasicAuthService(this.state.username, this.state.pswd)
        // .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.pswd);
        //         this.props.history.push(`/welcome/${this.state.username}`);
        //     }).catch(() => {
        //         this.setState({showSuccessMsg: false});
        //         this.setState({hasLoginFailed: true});
        //     })

        AuthenticationService
        .executeJWTAuthService(this.state.username, this.state.pswd)
        .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`);
            }).catch(() => {
                this.setState({showSuccessMsg: false});
                this.setState({hasLoginFailed: true});
            })
        
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className='container'>
                    {this.state.hasLoginFailed && <div className='alert alert-warning'>*** Invalid Credentials ***</div>}
                    {/*this.state.showSuccessMsg && <div>*** Login Successful ***</div>*/}
                    User Name: <input type='text' name='username' placeholder={this.state.username} onChange={this.handleChange}/>
                    Password: <input type='password' name='pswd' placeholder={this.state.pswd} onChange={this.handleChange}/>
                    <button className='btn btn-success' onClick={this.logonClick}>Login</button>
                </div>
            </div>
            )
    }
}

export default LoginComponent;