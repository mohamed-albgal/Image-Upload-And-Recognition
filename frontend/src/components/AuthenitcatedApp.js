import React from 'react'
import HomeContent from './HomeContent'
import NavBar from './NavBar'

//if drilling props down 2 levels works, will using context make the App comp re-render (desired)
//log out by changing the context 
const AuthencticatedApp = ({logout}) => {
    return (
        <NavBar authed={true} logout={logout}>
            <HomeContent />
        </NavBar>
    );
}

export default AuthencticatedApp;