import React, { useState } from 'react'
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Store/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [login, setLogin] = useState(true);
  const { loggedIn, loginhandle, signupHandle } = useContext(AuthContext);


  
  return (
    <>
      {login ? (
        <Login changeForm={setLogin} loginhandle={loginhandle} />
      ) : (
        <Signup changeForm={setLogin} signupHandle={signupHandle} />
      )}
    </>
  );
}


export default LoginPage