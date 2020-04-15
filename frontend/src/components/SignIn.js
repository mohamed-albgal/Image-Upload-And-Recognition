import React, { useState, useContext } from 'react'
//import { AuthContext } from './AuthContext'
import {Link, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { AuthContext } from './AuthContext';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const {setLoggedIn}  = useContext(AuthContext);
  const history = useHistory();

  const errorMsgs = {
    success: "Success, Welcome Back!",
    error: "Credentials Unreconized, Please Try Again"
  }
  
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      setIsLoading("loading")
      await Auth.signIn(email, password);
      setLoggedIn(true);
      setIsLoading("");
      setErrorState("success")
      setTimeout(() => history.push('/'), 700);
    }catch (err){
      setIsLoading("");
      setErrorState("error");
    }
  }
	return (
      <div style={{width: '50%',margin:'auto'}}>
      {errorState && 
      (<div className={`ui ${errorState} message`}>
        <div className="header">{errorMsgs[errorState]}</div>
      </div>)}
      <form className={`ui ${isLoading} form raised segment`} onSubmit={e => handleSignIn(e)}>
        <div className=" required field">
          <h1>Sign In</h1>
          <label>Email</label>
          <input type="email" autoComplete='username' name='email' placeholder="" required autoFocus onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="required field">
        <label>Password</label>
          <input type="password" autoComplete='current-password' name="password" required minLength='8' onChange={e => setPassword(e.target.value)}/>
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