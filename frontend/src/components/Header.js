import React, {useContext} from 'react';
import { AuthContext } from './AuthContext'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext);
	return (
		<div className=" ui  menu">
			<Link to='/' className='float left raised header item'>Object Recognition Tool</Link>
			{loggedIn ? 
				(<div className='ui menu'>
					<div className='item'>Logout</div></div>)
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
