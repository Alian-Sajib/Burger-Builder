import React, { Component } from 'react'
import { fetchOrder } from '../../redux/actionCreators'
import { connect } from 'react-redux'
import Order from './Order/Order'
import Spinner from '../Spinner/Spinner'

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(fetchOrder(token, userId)),
    }
}
class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.token, this.props.userId);
    }
    // componentDidUpdate() {
    //     console.log(this.props);
    // }
    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{
                border: '1px solid grey',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px'
            }}> Error !!!. Please try again later.</p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: '1px solid grey',
                    borderRadius: '5px',
                    padding: '5px',
                    marginRight: '10px'
                }}>No Orders Found.</p>
            }
            else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />;
                })
            }
        }
        return (
            <div className='container'>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)