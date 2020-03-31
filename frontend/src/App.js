import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import Navbar from "./Navbar";
import "./App.css";
import { checkSessionID } from "./APIFunctions";
import { useCookies } from "react-cookie";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [cookies, removeCookie] = useCookies(["name"]);

  useEffect(() =>{
    checkSession();
  // eslint-disable-next-line
  }, []);

  async function checkSession(){
    var results = await checkSessionID(cookies.sessionID);
    if(results.length > 0){
      setAuthenticated(true);
      setIsAuthenticating(false);
    } else{
      setAuthenticated(false);
    }

    setIsAuthenticating(false);
  }

  function logout(){
    removeCookie("sessionID");
    removeCookie("accountID");
    setAuthenticated(false);
  }

  return (
    !isAuthenticating &&
    <div className="App">
      <BrowserRouter>
        <Navbar authed={authenticated} handleLogout={logout} />
        <Routing appProps={{ authenticated, setAuthenticated }} />
      </BrowserRouter>
    </div>
  );
}

export default App;
