import React from 'react'

const Order = (props) => {
    const ingredients = []
    for (let [key, value] of Object.entries(props.order.ingredients)) {
        if (key === 'id') continue;
        ingredients.push({ type: key, amount: value })
    }
    // console.log(props.order.ingredients)
    //console.log(ingredients)
    const ingredientsSummary = ingredients.map(item => {
        return <span key={item.type} style={{
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '5px',
            marginRight: '10px'
        }}> {item.type} x <span style={{ textTransform: 'capitalize' }}>
                {item.amount}</span> </span>
    })
    return (
        <div className='container' style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px'
        }}>
            <p>Order Number : {props.order.id} </p>
            <p>Delivery Address : {props.order.customerDetail.deliveryAddress}</p>
            <hr />
            {ingredientsSummary}
            <hr />
            <p>Total Price : {props.order.price}</p>
        </div>
    )
}

export default Order