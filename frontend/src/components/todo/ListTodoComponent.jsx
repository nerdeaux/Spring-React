import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment';

class ListTodoComponent extends Component {
    constructor(props) {
        console.log('constructor');     // First Method that is called in the lifecycle
        super(props);

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);

        this.state = {
            todos : [],
            message: null
        }
    }

    componentWillUnmount() {        // Method is called when component is when component is unmounted from the view
        console.log('componentWillUnmount');
    }

    shouldComponentUpdate(nextProps, nextState) {        // Fourth Method that is called in the lifecycle
        console.log('shouldComponentUpdate');
        console.log(nextProps);
        console.log(nextState);
        return true
    }

    componentDidMount() {       // Third Method that is called in the lifecycle
        console.log('componentDidMount')
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                //console.log(response);
                this.setState({ todos: response.data });
            }
        )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUser();
        // console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message: `Delete of todo ${id} successful!`})
                this.refreshTodos();
            }
        )
    }

    updateTodoClicked(id) {
        console.log('Update' + id);
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    render() {          // Second Method that is called in the lifecycle
        console.log('render')
        return (
            <div>
                <h1>List Todo's</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map ( 
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.desc}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className='btn btn-success' onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button onClick={() => this.deleteTodoClicked(todo.id)} className='btn btn-warning'>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                        <button className='btn btn-success' onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default ListTodoComponent;