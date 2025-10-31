import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/Dasboard";
import SubjectCard from "./components/SubjectCard/SubjectCard";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Store/AuthContext";
import MyAccount from "./pages/Myaccount";

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!loggedIn ?<Homepage />:<Navigate to='/home'/>} />
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/home" /> : <Loginpage />}
          />
          <Route
            path="/home"
            element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/subject"
            element={loggedIn ? <SubjectCard /> : <Navigate to="/login" />}
          />
          <Route
          path="/account"
          element={loggedIn ? <MyAccount/> : <Navigate to='/login'/>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
