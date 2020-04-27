import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import Routes from './Routes'
import { Auth } from 'aws-amplify'
import {AuthContext} from './AuthContext'

const appStyle =  {
  height: '100%',
  paddingTop: '10vh',
  background: '#f9f8ff',
}

const App =  () => {
	const [loggedIn, setLoggedIn] = useState(null);
	useEffect(() =>{
		if (!loggedIn)
			checkForSession();
	},[])

	const checkForSession = async () => {
		try {
			//await Auth.currentSession();
			const user = await Auth.currentUserInfo();
			setLoggedIn({id:user.id, username:user.username, email: user.attributes.email});
		}catch(err){
			console.log('error from App, can"t check session');
		}
	}

	return (
		<div style={appStyle}>
			<AuthContext.Provider value={{ loggedIn , setLoggedIn }}>
				<Header />
				<Routes />
			</AuthContext.Provider>
			<Footer />
		</div>
	)
}
export default App;

