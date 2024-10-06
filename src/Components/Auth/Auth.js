import React, { Component } from 'react'
import { Formik } from 'formik'
import { auth } from '../../redux/authactionCreators'
import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapDispatchtToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authErrMsg: state.authErrMsg,
    }
}

class Auth extends Component {
    state = {
        mode: 'Sign Up',
    }
    switchHandler = () => {
        this.setState({ mode: this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up' });
    }
    render() {
        let err = null;
        if (this.props.authErrMsg !== null) {
            err = <Alert color="danger">{this.props.authErrMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = (<Spinner />);
        }
        else {
            form = (<Formik initialValues={
                {
                    email: '',
                    password: '',
                    passwordConfirm: ''
                }}
                onSubmit={(values) => {
                    this.props.auth(values.email, values.password, this.state.mode)
                }}
                validate={
                    (values) => {
                        const errors = {};
                        if (!values.email)
                            errors.email = 'Required';
                        else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/i.test(values.email))
                            errors.email = 'Invalid Email Format';
                        if (!values.password)
                            errors.password = 'Required';
                        else if (values.password.length < 6)
                            errors.password = 'Password must be at least 6 characters long';
                        if (this.state.mode === 'Sign Up') {
                            if (!values.passwordConfirm)
                                errors.passwordConfirm = 'Required';
                            else if (values.passwordConfirm !== values.password)
                                errors.passwordConfirm = 'Passwords do not match';
                        }
                        return errors;
                    }
                }
            >
                {({ values, handleChange, handleSubmit, errors }) => (<div className='container' style={{
                    border: '1px solid grey',
                    borderRadius: '5px',
                    padding: '15px',

                }}>
                    <button style={{
                        width: '100%',
                        color: 'white',
                        backgroundColor: '#D70F64'
                    }} className='btn btn-lg' onClick={this.switchHandler}
                    >Switch to {this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up'}</button> <br /><br />

                    <form onSubmit={handleSubmit}>
                        <input name='email' placeholder='Enter Your Email' className='form-control' value={values.email} onChange={handleChange} />
                        <span style={{
                            color: 'red'
                        }}>{errors.email}</span><br />

                        <input name='password' placeholder='Password' className='form-control' value={values.password} onChange={handleChange} />
                        <span style={{
                            color: 'red'
                        }}>{errors.password}</span><br />
                        {this.state.mode === 'Sign Up' ? <div>
                            <input name='passwordConfirm' placeholder='Confirm Password' className='form-control' value={values.passwordConfirm} onChange={handleChange} />
                            <span style={{
                                color: 'red'
                            }}>{errors.passwordConfirm}</span> <br />
                        </div> : null}

                        <button type='submit' className='btn btn-success'>{this.state.mode === 'Sign Up' ? 'Sign Up' : 'Login'}</button>
                    </form>
                </div>)}
            </Formik>)
        }
        return (
            <div>
                {err}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchtToProps)(Auth)