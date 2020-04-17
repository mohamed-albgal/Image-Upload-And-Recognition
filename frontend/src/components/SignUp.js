import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {AuthContext } from './AuthContext'
import { Auth } from 'aws-amplify'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [pass2, setPass2] = useState(false);
  const [loading, setLoading] = useState("");
  const [errorMsg, setErrorMsg ] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const {setLoggedIn}  = useContext(AuthContext);
  const history = useHistory();
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading("loading")
    try {
      if (password !== pass2)
      {
        throw new Error("The entered passwords do not match")
      }
      await Auth.signUp({username:email, password:password});
      setLoading("");
      setConfirmation(true)
      setErrorMsg("");
      setErrorStatus(false);
      
      // await Auth.signIn(email, password);
      // setLoggedIn(true);
      // history.push('/')
    }catch (err){
      setLoading("");
      setErrorStatus(true)
      setErrorMsg(err.message)
      console.log('error in signup page handling signup')
      
      
    }
  }

  const handleConfirmation = async (event) => {
      event.preventDefault();
      setLoading("loading")
      try {
        await Auth.confirmSignUp(email, confirmation);
        await Auth.signIn(email, password);
        const user = await Auth.currentUserInfo();
        setLoggedIn({id:user.id, username:user.username, email: user.attributes.email});
        setLoading("");
        history.push('/')
      }catch(err) {
        setLoading("")
        setErrorStatus(true)
        setErrorMsg(err.message)
        
      }

  }
	return (
      <div style={{width: '50%',margin:'auto'}}>
      {errorStatus && 
        <div className={`ui warning message`}>
          <div className="header"> {errorMsg}</div>
        </div>
       }
       {confirmation ? (
        <div> 
          <div className={`ui warning message`}>
            <div className="header"><p>Please enter the confirmation code sent to your email</p></div>
          </div>
          <form className={`ui ${loading} form ${errorStatus && 'error'} raised segment`}  onSubmit={e => handleConfirmation(e)}>
            
            <div className="required field">
            <label>Confirmation Code</label>
              <input type="text" required onChange={e => setConfirmation(e.target.value)}/>
            </div>
            <button 
            style={{backgroundColor:"#1b1c1d",color:'#f9f8ff',padding:'1em'}} 
            className="ui fluid large button"
            >Verify</button>
            </form>
          </div>
       )
       :
      (<form className={`ui ${loading}  form raised segment`} onSubmit={e => handleSignUp(e)}>
        <div className="required field">
          <h1>Sign Up</h1>
          <label>Email</label>
		  <input type="email" 
      name='email'
      autoComplete="username"
		  onChange={e => setEmail(e.target.value)}
		  required autoFocus/>
        </div>
        <div className=" required field">
        <label>Password</label>
          <input type="password" autoComplete='new-password' name="password" required minLength='8' onChange={e => setPass(e.target.value)}/>
        </div>
        <div className = " required field">
          <label>Re-Type Password</label>
          <input type="password" autoComplete='new-password' name="retypedpassword" required minLength='8' onChange={e => setPass2(e.target.value)}/>
        </div>
        <button 
        style={{backgroundColor:"#1b1c1d",color:'#f9f8ff',padding:'1em'}} 
        className="ui fluid large button"
        >Register</button>
    </form>)}
  </div>

  )
}
export default SignUp;