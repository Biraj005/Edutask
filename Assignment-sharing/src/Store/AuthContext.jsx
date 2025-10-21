import { createContext, useState,useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const backendUrl = 'http://localhost:3000';
const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loginpgaeLoading, setLoginPageLoading] = useState(false);
    const [signupgaeLoading, setSignupageLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage.getItem("loggedIn")) || false
    );
    useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

    const signupHandle = async (Data) => {
        setSignupageLoading(true);
        console.log("Event:", typeof (Data), Data);
        console.log(backendUrl + 'api/signup')
        try {
            const result = await axios.post(`${backendUrl}/api/signup`, Data, {
                withCredentials: true, 
                headers: { "Content-Type": "application/json" }
            })
            console.log("the result", result.data)
            setSignupageLoading(false);
            console.log(result.data);
            console.log(result.data.message);

            if (result.data.success) {
                toast.success(result.data.message);
                setLoggedIn(true);
            } else {
                toast.error(result.data.message);
            }

        } catch (err) {
            if (err.response) {
                console.error("Signup failed:", err.response.data);
            } else {
                console.error("Network/Other error:", err.message);
            }
        }
    };
    const loginhandle = async (Data) => {
        setLoginPageLoading(true);

        try {
            const result = await axios.post(`${backendUrl}/api/login`, Data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })

            console.log(result.data);
            console.log(result.data.message);


            if (result.data.success) {
                console.log("✅ Backend success:", result.data);
                setLoggedIn(true);
                console.log("🟢 setLoggedIn(true) called");
                toast.success(result.data.message);
            } else {
                console.log("❌ Backend failure:", result.data);
                toast.error(result.data.message);
            }

            setLoginPageLoading(false);

        } catch (error) {
            console.log(error);
        }

    }

    const contextValue = {
        user,
        setUser,
        signupHandle,
        loginhandle,
        loginpgaeLoading,
        setLoginPageLoading,
        signupgaeLoading,
        setSignupageLoading,
        loggedIn, setLoggedIn

    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
