import React from 'react'
import NavBar from './NavBar'
import SignIn from './SignIn'

const UnauthenticatedApp = () => {
    return (
        <>
            <NavBar authed={false}/>
            <SignIn />
        </>
    )
}

export default UnauthenticatedApp;