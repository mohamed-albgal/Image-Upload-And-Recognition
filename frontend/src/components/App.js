import React, { useState, useEffect, useContext } from 'react';
import Header from './Header'
import Footer from './Footer'
import Routes from './Routes'
import { Amplify, Auth } from 'aws-amplify'
import {AuthContext} from './AuthContext'
import awsConfig from '../config'
import { Redirect } from 'react-router-dom';
Amplify.configure(awsConfig.amplify);

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
		try {
			await Auth.currentSession();
			setLoggedIn(true);
		}catch(err) {
			console.log('no session');
			console.log(err);
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

