import React , {useContext} from 'react'
import { AuthContext } from './AuthContext'
import {Auth} from 'aws-amplify'

const Logout = () => {
    const { setLoggedIn} = useContext(AuthContext);
    const handleLogout = async () => {
         await Auth.signOut();
         setLoggedIn(false);
    }
    return (
        <div style={{margin:'5vh 10vh'}}className= 'ui card'>
            <button className= 'massive black ui button' onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Logout;