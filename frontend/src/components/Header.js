import React, {useContext} from 'react';
import { AuthContext } from './AuthContext'
import { NavLink, Link } from 'react-router-dom'
import {Auth } from 'aws-amplify'

const Header = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext);
	
	const handleLogout = async () => {
		await Auth.signOut();
		setLoggedIn(false);
   }
	return (
		<div className=" ui  menu">
			<Link to='/' className='float left raised header item'>Object Recognition Tool</Link>
			{loggedIn ? <NavLink to='/signin' className='item' onClick={handleLogout}>Logout</NavLink>
			:
				(<div className='ui menu'>
					<NavLink to='signin' className= 'item'> Sign-In </NavLink>
					<NavLink to='/signup' className="item"> Sign-Up </NavLink>
				</div>)
			}
  		</div>
	)
}

export default Header;
