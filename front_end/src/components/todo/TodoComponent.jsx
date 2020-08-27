import React, {Component} from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            desc : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser();

        let todo = {
            id: this.state.id,
            desc: values.desc,
            targetDate: values.targetDate
        }

        if(this.state.id===-1) {
            TodoDataService.createTodo(username, todo)
            .then(() => { this.props.history.push('/todos') })
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
            .then(() => { this.props.history.push('/todos') })
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if(!values.desc) {
            errors.desc = 'Enter a Description...'
        } else if (values.desc.length<6) {
            errors.desc = 'Description should at least be 6 characters long...'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date...'
        }

        return errors
    }

    componentDidMount() {
        if(this.state.id===-1) {
            return
        }

        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            desc: response.data.desc,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }

    render() {
        let { desc, targetDate } = this.state;  // Destructuring
        
        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik
                        initialValues={{ desc, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                <ErrorMessage name='desc' component='div' className='alert alert-warning'/>
                                <ErrorMessage name='targetDate' component='div' className='alert alert-warning'/>
                                    <fieldset className='form-group'>
                                        <label>Description</label>
                                        <Field className='form-control' type='text' name='desc'/>
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Target Date</label>
                                        <Field className='form-control' type='date' name='targetDate'/>
                                    </fieldset>
                                    <button className='btn btn-success' type='submit'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent;