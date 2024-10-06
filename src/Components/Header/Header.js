import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css'
import Logo from '../../assets/logo/logo.png';

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (<Nav className='mr-md-5'>
            <NavItem>
                <NavLink to='/login' className='NavLink'>Login</NavLink>
            </NavItem>
        </Nav>)
    }
    else {
        links = (<Nav className='mr-md-5'>
            <NavItem>
                <NavLink to='/' className='NavLink'>Burger Builder</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to='/orders' className='NavLink'>Orders</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to='/logout' className='NavLink'>Log Out</NavLink>
            </NavItem>
        </Nav>)
    }
    return (
        <div className='Navigation'>
            <Navbar style={{
                backgroundColor: '#D70F64',
                height: '50px',
            }}>
                <NavbarBrand href='/' className='mr-auto ml-md-5 Brand'>
                    <img src={Logo} alt='Logo' width='60px' />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header)