import React from 'react'
import Ingredient from './../Ingredient/Ingredient'
import './Burger.css'

const Burger = (props) => {
    let ingredientArr = props.ingredients.map((item) => {
        //count the number of amount items so create a array with the number of items
        let amountArr = [...Array(item.amount).keys()];
        //return the componeny according to the size of array
        return amountArr.map((_) => <Ingredient key={Math.random()} type={item.type} />);
    })
        .reduce((arr, element) => { //combine all array element togther
            // console.log(element)
            return arr.concat(element)
        }, []);

    // console.log(ingredient)
    if (ingredientArr.length === 0) {
        ingredientArr = <p>Please Add some ingredients !</p>
    }
    return (
        <div className='Burger'>
            <Ingredient type='bread-top' />
            {ingredientArr}
            <Ingredient type='bread-bottom' />
        </div>
    )
}

export default Burger