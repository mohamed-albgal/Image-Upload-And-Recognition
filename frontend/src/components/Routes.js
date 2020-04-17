import React , { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeContent from './HomeContent'
import SignUp from './SignUp'
import SignIn from './SignIn'
import { AuthContext } from './AuthContext'



const Routes = () => {
    const {loggedIn } = useContext(AuthContext);
    return (
        <Switch>
            <Route exact path='/'>
                {loggedIn ? <HomeContent /> : <SignIn />}
            </Route>
            <Route path='/signin'>
                <SignIn />
            </Route>
            <Route path="/signUp"><SignUp /></Route>
            <Route>
                <h1 className= 'ui massive segment'> PAGE NOT FOUND </h1>
            </Route>
        </Switch>
    )
}

export default Routes;