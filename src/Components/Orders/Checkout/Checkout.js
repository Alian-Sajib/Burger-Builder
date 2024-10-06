import React, { Component } from 'react'
import { Navigate } from 'react-router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredient } from '../../../redux/actionCreators';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        purchasable: state.purchasable,
        totalPrice: state.totalPrice,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredient: () => dispatch(resetIngredient())
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        goback: false,
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }
    goBack = () => {
        this.setState({ goback: true });
    }
    submitHandle = () => {
        this.setState({ isLoading: true });

        const ingredient = [...this.props.ingredients]; //make copy
        const ingredientsObject = ingredient.reduce((acc, curr) => {
            const { type, amount } = curr;
            acc[type] = amount;
            return acc;
        }, {});

        const order = {
            ingredients: ingredientsObject, //this.props.ingredients,
            customerDetail: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            user: this.props.userId,
        }
        //when we use firebase we have to add .json at the end of the link
        // firebase link = 'https://burger-builder-c6305-default-rtdb.firebaseio.com/orders.json?auth=' + this.props.token
        //using django rest framework

        const token = this.props.token
        axios.post("http://127.0.0.1:8000/api/orders/", order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Successful! Your order ID is: #56565254585"
                    });
                    this.props.resetIngredient();
                }
                else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Failed to place order"
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Failed to connect to server"
                })
            })
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        if (this.state.goback) return <Navigate to='/' />;
        let form = <div>
            <h4 style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
            }}>Payment : {this.props.totalPrice} BDT</h4>

            <form style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
            }}>
                <textarea name='deliveryAddress' value={this.state.values.deliveryAddress}
                    className='form-control' placeholder='Your Address' onChange={(e) => this.inputChangeHandler(e)}> </textarea>
                <br />
                <input name='phone' value={this.state.values.phone} className='form-control' placeholder='Phone'
                    onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name='paymentType' value={this.state.values.paymentType} className='form-control'
                    onChange={(e) => this.inputChangeHandler(e)}>
                    <option value='Cash On Delivery'>Cash On Delivery</option>
                    <option value='Online Payment'>Online Payment</option>
                </select>
                <br />
                <Button onClick={this.submitHandle} style={{ backgroundColor: "#D70F64" }}
                    className='mr-auto' disabled={!this.props.purchasable}>Place Order</Button> &nbsp;
                <Button onClick={this.goBack} color='secondary' className='ml-1'>Cancel</Button>
            </form>
        </div>
        return (
            <div className='container'>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalHeader>Order Confirmation</ModalHeader>
                    <ModalBody>
                        {this.state.modalMsg}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.goBack}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)