import React, { useState, useContext } from 'react'
//import { AuthContext } from './AuthContext'
import {Link, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { AuthContext } from './AuthContext';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const {setLoggedIn}  = useContext(AuthContext);
  const history = useHistory();
  
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      setIsLoading("loading")
      await Auth.signIn(email, password);
      setLoggedIn(true);
      setIsLoading("");
      setTimeout(history.push('/'), 3000);
    }catch (err){
      console.log('in signin page, no signin success')
      setIsLoading("");
      setErrorState(true);
    }
  }
	return (
      <div style={{width: '50%',margin:'auto'}}>
      {errorState && 
      (<div class="ui error message">
      <div class="header"> Those credentials are not recognized</div>
        <p>Please re-attempt. If you need to create and account, click the link at the bottom of the form</p>
     </div>)}
      <form className={`ui ${isLoading} form ${errorState} raised segment`} onSubmit={e => handleSignIn(e)}>
        <div className="field">
          <h1>Sign In</h1>
          <label>Email</label>
          <input type="email" name='email' placeholder="" required autoFocus onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="field">
        <label>Password</label>
          <input type="password" name="password" required minLength='8' onChange={e => setPassword(e.target.value)}/>
        </div>
        <button 
        style={{backgroundColor:"#1b1c1d",color:'#f9f8ff',padding:'1em'}} 
        className="ui fluid large button"
        >Sign In</button>
    </form>
    <div style={{marginTop:"1em"}}>
      <Link to='/signup'>
        <h5 className= "">New User? Register Here!</h5>
      </Link>
    </div>
  </div>
  )
}
export default SignIn;