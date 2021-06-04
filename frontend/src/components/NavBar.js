import React from 'react';
import { AuthContext } from './AuthContext'
import { NavLink, Link } from 'react-router-dom'

const NavBar = ({authed, logout}) => {
	return (
		<div className=" ui  menu">
			<Link to='/' className='float left raised header item'>Object Recognition Tool</Link>
			{authed ? 
				(<div className='ui menu' onClick={logout}>
					<NavLink className='item'>Logout</NavLink>
				</div> )
				:
				(<div className='ui menu'>
					<NavLink to='/signin' className= 'item'> Sign-In </NavLink>
					<NavLink to='/signup' className="item"> Sign-Up </NavLink>
				</div>)
			}
  		</div>
	)
}

export default NavBar;
