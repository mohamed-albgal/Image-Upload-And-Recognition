import React, { useState } from 'react'
import awsConfig from '../config'
import {Link} from 'react-router-dom'
import { Auth, Amplify } from 'aws-amplify'
Amplify.configure(awsConfig.amplify);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await Auth.signIn(email, password)
      //alert("Logged In!")
    }catch (err){
      console.log(err);
    }
  }
	return (
      <div style={{width: '50%',margin:'auto'}}>
      <form className="ui form raised segment" onSubmit={e => handleSignUp(e)}>
        <div className="field">
          <h1>Sign Up</h1>
          <label>Email</label>
		  <input type="email" 
		  name='email'
		  onChange={e => setEmail(e.target.value)}
		  required autoFocus/>
        </div>
        <div className="field">
        <label>Password</label>
          <input type="password" name="password" required minLength='8' onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className = "field">
          <label>Re-Type Password</label>
          <input type="password" name="password" required minLength='8' onChange={e => setConfirmPassword(e.target.value)}/>
        </div>
        <button 
        style={{backgroundColor:"#1b1c1d",color:'#f9f8ff',padding:'1em'}} 
        className="ui fluid large button"
        >Register</button>
    </form>
  </div>

  )
}
export default SignUp;