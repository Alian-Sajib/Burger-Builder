import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Controls from '../Controls/Controls'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Summary from './Summary/Summary'
import { Navigate } from "react-router-dom"

import { connect } from 'react-redux'
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators'

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        purchasable: state.purchasable,
        totalPrice: state.totalPrice,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}
class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
        checkout: false,
    }

    addIngredientHandler = type => {
        this.props.addIngredient(type);
        this.props.updatePurchasable()
    }

    removeIngredientHandler = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable()
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    handleCheckout = () => {
        this.setState({ checkout: true });
    }
    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        if (this.state.checkout) return <Navigate to='/checkout' />;
        return (
            <div>
                <div className='d-flex flex-md-row flex-column'>
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price : {this.props.totalPrice.toFixed(0)} BDT </h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Procced to Checkout</Button>
                        <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)