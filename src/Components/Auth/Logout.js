import React, { Component } from 'react'
import { logout } from '../../redux/authactionCreators'
import { connect } from 'react-redux'
import { Navigate } from 'react-router'
const mapDispatchtToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}
export class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <Navigate to='/' />
        )
    }
}

export default connect(null, mapDispatchtToProps)(Logout)