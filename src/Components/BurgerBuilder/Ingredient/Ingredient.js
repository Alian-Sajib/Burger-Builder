import React from 'react'
import './Ingredient.css'
import BreadTop from '../../../assets/images/top.png'
import Cheese from '../../../assets/images/cheese.png'
import Meat from '../../../assets/images/meat.png'
import Salad from '../../../assets/images/salad.png'
import BreadBottom from '../../../assets/images/bottom.png'

const Ingredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case 'bread-top':
            ingredient = <div><img src={BreadTop} alt='Bread Top' /></div>
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} alt='Cheese' /></div>
            break;
        case 'meat':
            ingredient = <div><img src={Meat} alt='Meat' /></div>
            break;
        case 'salad':
            ingredient = <div><img src={Salad} alt='Salad' /></div>
            break;
        case 'bread-bottom':
            ingredient = <div> <img src={BreadBottom} alt='Bread Bottom' /></div>
            break;
        default:
            ingredient = null;
            break;
    }
    return (
        <div className='Ingredient'>
            {ingredient}
        </div>
    )
}

export default Ingredient