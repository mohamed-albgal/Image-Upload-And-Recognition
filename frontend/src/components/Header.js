import React, {useContext} from 'react';
import { AuthContext } from './AuthContext'
import { NavLink, Link, useParams } from 'react-router-dom'
import {Auth } from 'aws-amplify'

const Header = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext);

	const handleLogout = async () => {
		await Auth.signOut();
		setLoggedIn(null);
   }
	return (
		<div className=" ui pointing menu">
		<Link to='/' className=' ui black massive label header item'>Object Recognition Tool</Link>
		{loggedIn ?
			(<div className= 'right menu'>
				<div className='ui blue top attached large label'>Logged in as: {loggedIn.email}</div>
				<NavLink to='/signin' className=' ui black top right attached large label' onClick={handleLogout}>Logout</NavLink>
				<NavLink to='/photos' className='ui black large label header item'><h3>My Photos</h3></NavLink>
			</div>)
			:
			(<div className='right menu'>
				<NavLink to='signin' className='ui header blue item'> Sign-In </NavLink>
				<NavLink to='/signup' className="ui header item"> Sign-Up </NavLink>
			</div>)
		}
  		</div>
	)
}

export default Header;
