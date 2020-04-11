import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomeContent from './HomeContent'
import ImageUploader from './ImageUploader'
import SignUp from './SignUp'
import SignIn from './SignIn'


const appStyle =  {
  display: 'flex',
  justifyContent:'flex-start',
  height: '100%',
  flexDirection: 'column',
  paddingTop: '3vh',
  background: '#f9f8ff'
}

export default () => {
	return (
		<div style={appStyle} >
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomeContent}  />
					<Route path="/signIn" component={SignIn} />
					<Route path="/signUp" component={SignUp} />
					<Route path="/upload" component ={ImageUploader} />
				</Switch>
				<Footer />
			</div>
		</div>

	)
}