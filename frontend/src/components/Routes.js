import React , { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeContent from './HomeContent'
import SignUp from './SignUp'
import SignIn from './SignIn'
import UserImageDisplay from './UserImageDisplay'
import InvalidRoutePage from './InvalidRoutePage'
import { AuthContext } from './AuthContext'



const Routes = () => {
    const { loggedIn } = useContext(AuthContext);
    return (
        <Switch>
            <Route exact path='/'>
                {loggedIn ? <HomeContent /> : <SignIn />}
            </Route>
            <Route exact path='/photos'>
                {loggedIn ? <UserImageDisplay /> : <InvalidRoutePage/>}
            </Route>
            <Route path='/signin'>
                <SignIn />
            </Route>
            <Route path="/signUp"><SignUp /></Route>
            <Route>
                <InvalidRoutePage/>
            </Route>
        </Switch>
    )
}

export default Routes;