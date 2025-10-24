import { createContext, useState,useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const backendUrl = 'http://localhost:3000';
const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const [addSubjectLoading,setAddSubjectLoading] = useState(false);
    const [students,setStudenst] = useState([]);
    const [subjects,setSubjects] =useState([]);
    const [loadingstudentList,setLoadingStudentList] = useState(false);
    const [loginpgaeLoading, setLoginPageLoading] = useState(false);
    const [signupgaeLoading, setSignupageLoading] = useState(false);
    const [studenAddLoading,setStudentAddLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage.getItem("loggedIn")) || false
    );
    useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

    const signupHandle = async (Data) => {
        setSignupageLoading(true);
        console.log(Data)
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
                localStorage.setItem('user',JSON.stringify(result.data.user));
                setUser(result.data.user);
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
    const Logout =async ()=>{
       try {
        await axios.get('http://localhost:3000/api/logout', {}, { withCredentials: true });
        localStorage.removeItem('loggedIn');
        toast.error('Logout')
        window.location.href = '/login';
       } catch (error) {
        console.log("Error while logout");
        toast.error("Error");
        
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
                localStorage.setItem('user',JSON.stringify(result.data.user));
                setUser(result.data.user);
                console.log("✅ Backend success:", JSON.stringify(result.data.user));
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
    const getSubjects = async ()=>{
        try {
            const result = await axios.get('http://localhost:3000/api/subjects',{
                withCredentials:true,
                headers:{"Content-Type":"application/json"}
            })
            console.log(result.data.subjects);
            setSubjects(result.data.subjects);            
        } catch (error) {
            toast.error('Error');
            console.log('Error while getting subjects');
        }
    }
    const addStudent = async (data)=>{
        setStudentAddLoading(true);
        console.log(data)
        try {
            const result = await axios.put(`${backendUrl}/api/subject/user`,data,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
           console.log(result)

            if(result.data.success){
                toast.success("Student added");
            }else{
                toast.error(result.data.message);
            }
        } catch (error) {
            toast.error(error.message);
          
            console.log(error.message);
            
        }
        finally{
            setStudentAddLoading(false);
        }
        
    }
    const getStudents = async (code) => {
        console.log(code);
        setLoadingStudentList(true);
        try {
             const result = await axios.get(`${backendUrl}/api/user/${code}`,{
                withCredentials:true,
                 headers:{
                    "Content-Type":"application/json"
                }
             });
             console.log(result);

             if(result.data.success){
                console.log(result.data.users)
                setStudenst(result.data.users);
                
             }else{
                 toast.error(error.message);
             }
        } catch (error) {
            toast.error(error.message);
            
        }finally{
            setLoadingStudentList(false);
        }
        
    }
    const addSubject = async (data)=>{
        console.log(data);
        setAddSubjectLoading(true);
        try {
            const result = await axios.post(`${backendUrl}/api/subject`,data,{
                withCredentials:true,
                headers:{
                   "Content-Type":"application/json"
                }
            })

            if(result.data.success){
                toast.success("Subject added Successfully");
                console.log(result.data)
            }
            
        } catch (error) {

            toast.error(error.message);
            
        }
        finally{
            setAddSubjectLoading(false);
        }
    }
    const removeStudent = async (data)=>{
         console.log(data);
         try {

            const result = await axios.delete(`${backendUrl}/api/student`, {
                data: data,                     
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
                });


            if(result.data.success){

                const newStudentList = students.filter(item=>item._id!==data.studentId);
                setStudenst(newStudentList);
                toast.success("Student is removed");
            }else{
                toast.error("Student is not removed");
            }
            
         } catch (error) {

            toast.error(error.message);
            
         }
    }
    const contextValue = {
        
        setUser,
        signupHandle,
        loginhandle,
        loginpgaeLoading,
        setLoginPageLoading,
        signupgaeLoading,
        setSignupageLoading,
        loggedIn, setLoggedIn,Logout,
        subjects,setSubjects,
        getSubjects,user,
        studenAddLoading,setStudentAddLoading,
        addStudent,loadingstudentList,
        students,getStudents,addSubjectLoading,addSubject,
        removeStudent

    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
