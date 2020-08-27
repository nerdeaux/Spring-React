import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService';

export default class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessFullResponse = this.handleSuccessFullResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage: ' '
        }
    }

    render() {
        return (
            <div className='Welcome'>
                {/*this.state.hasLoginFailed && <div className='alert alert-warning'>{ this.state.error.response}</div>*/}
                <h1>Welcome</h1>
                <div className='container'>
                    Welcome {this.props.match.params.name}.
                    You can manage your todos
                    <NavLink activeStyle={{borderBottom: '2px solid red'}} to='/todos'> here</NavLink>.
                </div>
                <br/>
                <div className='container'>
                    Click here to get a customized welcome message.
                    <br/><br/>
                    <button className='btn btn-success' onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <br/>
                <div className='container'>
                    <h1 className='h1'>{this.state.welcomeMessage}</h1>
                </div>
            </div>
            
        )
    }

    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then(response => {
        //         this.handleSuccessFullResponse(response);
        //         console.log(response.data);
        //         console.log(response.status);
        //     }
        // );

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => {
        //         this.handleSuccessFullResponse(response);
        //         console.log(response.data);
        //         console.log(response.status);
        //     }
        // );

        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name)
        .then(response => {
                this.handleSuccessFullResponse(response);
                console.log(response.data);
                console.log(response.status);
            }
        )
        .catch(error => this.handleError(error));
    }

    handleSuccessFullResponse(response) {
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';
        
        if(error.message)
            errorMessage += error.message

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({ welcomeMessage: errorMessage })
    }
}