import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/Dasboard";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/home" element={<Dashboard/>} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
