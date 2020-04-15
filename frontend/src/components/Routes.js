import React , { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeContent from './HomeContent'
import ImageUploader from './ImageUploader'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Logout from './Logout'
import { AuthContext } from './AuthContext'



const Routes = () => {
    const {loggedIn } = useContext(AuthContext);
    return (
        <Switch>
            <Route exact path='/'>
                {loggedIn ? <HomeContent /> : <SignIn />}
            </Route>
            <Route path='/signin'>
                { loggedIn ? <Logout /> : <SignIn />}
            </Route>
            <Route path="/signUp"><SignUp /></Route>
        </Switch>
    )
}

export default Routes;