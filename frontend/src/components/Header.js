import React, {useContext} from 'react';
import { AuthContext } from './AuthContext'
import { NavLink, Link } from 'react-router-dom'
import {Auth } from 'aws-amplify'

const Header = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext);
	
	const handleLogout = async () => {
		await Auth.signOut();
		setLoggedIn(null);
   }
	return (
		<div className=" ui  menu">
		<Link to='/' className=' ui black massive label header item'>Object Recognition Tool</Link>
			{loggedIn ? 
				
				<div className= 'ui float right menu'>
					<div className='ui blue top attached large label'>Logged in as: {loggedIn.email}</div>
					<NavLink to='/signin' className=' ui black top right attached large label' onClick={handleLogout}>Logout</NavLink>
					<NavLink to='/photos' className='ui large black label header item'>My Photos</NavLink>
				</div>
			:
				(<div className='ui float right menu'>
					<NavLink to='signin' className= 'item'> Sign-In </NavLink>
					<NavLink to='/signup' className="item"> Sign-Up </NavLink>
				</div>)
			}
  		</div>
	)
}

export default Header;
