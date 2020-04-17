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
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() =>{
		checkForSession();
	},[])

	const checkForSession = async () => {
		await Auth.currentSession();
		setLoggedIn(true);
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

