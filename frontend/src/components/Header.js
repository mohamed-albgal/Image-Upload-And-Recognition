import React from 'react';
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className=" ui menu">
  				<Link to='/' className='header item'>Object Recognition Tool</Link>
  				<NavLink to='/signin' className="item">Sign-In</NavLink>
  				<NavLink to='/signup' className="item"> Sign-Up </NavLink>
  				<NavLink to='/upload' className="item"> Upload Images </NavLink>
  			</div>
	)
}

export default Header;
