// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/Dasboard";
import SubjectCard from "./components/SubjectCard/SubjectCard";
import { ThemeContextProvider } from "./Store/ThemeContext";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage/>} />
            <Route path="/home" element={<Dashboard/>} />
            <Route path="/subject" element={<SubjectCard/>} />
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  );
}

export default App;