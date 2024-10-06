import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    }
}
export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT
    }
}

export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

//using token for authorization of orders
export const fetchOrder = (token, userId) => dispatch => {
    //for firebase orders
    // const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    // axios.get('https://burger-builder-c6305-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
    //?id=${userId}

    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.get(`http://127.0.0.1:8000/api/orders/`, header)
        .then(response => {
            dispatch(loadOrders(response.data));
        })
        .catch(error => {
            dispatch(orderLoadFailed());
        });
}