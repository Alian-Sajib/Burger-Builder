import React, { Component } from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout/Checkout'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheck } from '../redux/authactionCreators'

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}
class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <Routes>
                        <Route path='/login' element={this.props.token === null ? <Auth /> : <Navigate to='/' />} />

                        <Route element={this.props.token !== null ? <Outlet /> : <Navigate to='/login' />}>
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/' element={<BurgerBuilder />} />
                        </Route>

                    </Routes>
                </div>

            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main)