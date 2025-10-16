import React, { useState } from 'react'
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup'

function Loginpage() {
    const [login,setLogin] = useState(false);
  return (
    <>
      {login ?
       <Login changeForm={setLogin}/>:
       <Signup changeForm={setLogin}/>}
    </>
  )
}

export default Loginpage