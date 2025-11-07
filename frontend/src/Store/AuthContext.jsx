import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const backendUrl =
  import.meta.env.MODE === 'production'
    ? '' 
    : import.meta.env.VITE_BACKEND_URL;




const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [getSubjectLoading, setGetSubjectsLoading] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [emailPageLoading, setemailPageLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [getSubmmisonLoading, setGetSubmmisonLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isSubmitPopupOpen, setSubmitPopupOpen] = useState(false);
    const [taskFormLoading, settaskFormLoading] = useState(false);
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
    const [getTaskLoading, setGetTaskLoading] = useState(false);
    const [addTaskLoading, setAddTaskLoading] = useState(false);
    const [addSubjectLoading, setAddSubjectLoading] = useState(false);
    const [students, setStudenst] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loadingstudentList, setLoadingStudentList] = useState(false);
    const [loginpgaeLoading, setLoginPageLoading] = useState(false);
    const [signupgaeLoading, setSignupageLoading] = useState(false);
    const [studenAddLoading, setStudentAddLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage.getItem("loggedIn")) || false
    );
    useEffect(() => {
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }, [loggedIn]);

    const signupHandle = async (Data) => {
        setSignupageLoading(true);
        try {
            const result = await axios.post(`${backendUrl}/api/signup`, Data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })
            setSignupageLoading(false);
            if (result.data.success) {
                toast.success(result.data.message);
                localStorage.setItem('user', JSON.stringify(result.data.user));
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
    const Logout = async () => {
        try {
            await axios.get(`${backendUrl}/api/logout`, {
                withCredentials: true,
            });

            localStorage.removeItem("loggedIn");
            localStorage.removeItem("user");
            setUser(null);
            setLoggedIn(false);
            toast.success("Logged out");

            window.location.href = "/login";
        } catch (error) {
            console.error("Error while logout:", error);
            toast.error("Logout failed");
        }
    };

    const loginhandle = async (Data) => {
        setLoginPageLoading(true);
        try {
            const result = await axios.post(`${backendUrl}/api/login`, Data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })
            if (result.data.success) {
                localStorage.setItem('user', JSON.stringify(result.data.user));
                setUser(result.data.user);
                setLoggedIn(true);
                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);
            }
            setLoginPageLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const getSubjects = async () => {
        setGetSubjectsLoading(true);
        try {
            const result = await axios.get(`${backendUrl}/api/subjects`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })
           
            setSubjects(result.data.subjects);
        } catch (error) {
            toast.error('Error');
            console.log(error.message);
        }
        finally {
            setGetSubjectsLoading(false);
        }
    }
    const addStudent = async (data) => {
        setStudentAddLoading(true);
        try {
            const result = await axios.put(`${backendUrl}/api/subject/user`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (result.data.success) {
                toast.success("Student added");
            } else {
                toast.error(result.data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
        finally {
            setStudentAddLoading(false);
        }
    }
    const getStudents = async (code) => {
        setLoadingStudentList(true);
        try {
            const result = await axios.get(`${backendUrl}/api/user/${code}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.data.success) {
                setStudenst(result.data.users);
            } else {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoadingStudentList(false);
        }

    }
    const addSubject = async (data) => {
        setAddSubjectLoading(true);
        try {
            const result = await axios.post(`${backendUrl}/api/subject`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (result.data.success) {
                toast.success("Subject added Successfully");
            } else {
                toast.error(result.data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setPopupOpen(false);
            setAddSubjectLoading(false);
        }
    }
    const removeStudent = async (data) => {
        try {
            const result = await axios.delete(`${backendUrl}/api/student`, {
                data: data,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.data.success) {
                const newStudentList = students.filter(item => item._id !== data.studentId);
                setStudenst(newStudentList);
                toast.success("Student is removed");
            } else {
                toast.error("Student is not removed");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const addTask = async (Data) => {
        settaskFormLoading(true)
        const formData = new FormData();
        formData.append('title', Data.title);
        formData.append('description', Data.description);
        formData.append('deadline', Data.deadline);
        formData.append('subject', Data.subject);
        if (Data.file) {
            formData.append('attachment', Data.file);
        }
        setAddTaskLoading(true);
        try {
            const result = await axios.put(`${backendUrl}/api/teacher/task`, formData, {
                withCredentials: true,
            })
            if (result.data.success) {
                setTasks(prevTasks => [...prevTasks, result.data.newTask]);

                toast.success("Task added");
            } else {

                toast.error(result.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setAddTaskLoading(false);
            setAddTaskOpen(false);
            settaskFormLoading(false);
        }
    }
    const getTasks = async (Data) => {
        setGetTaskLoading(true);
        const url = `${backendUrl}/api/${user && user.role === 'teacher' ? "teacher" : "student"}/tasks`;
        try {
            const result = await axios.post(`${backendUrl}/api/${user && user.role === 'teacher' ? "teacher" : "student"}/tasks`, Data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (result.data.success) {
                setTasks(result.data.tasks);
            } else {
                toast.error(result.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setGetTaskLoading(false);
        }
    }
    const removeTask = async (data) => {
        try {
            const result = await axios.delete(`${backendUrl}/api/teacher/task`, {
                data: {
                    taskId: data
                },
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (result.data.success) {
                setTasks(prevTasks =>
                    prevTasks.filter(task => task._id !== data)
                );
                toast.success("Task removed");
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const submitTask = async (Data) => {
        setIsSubmitting(true);
        try {
            const result = await axios.put(`${backendUrl}/api/submit`, Data, {
                withCredentials: true,
            })

            if (result.data.success) {
                setTasks(prev =>
                    prev.map(task =>
                        task._id !== Data.get("taskId")
                            ? task
                            : { ...task, status: "complete" }
                    )
                );

                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);
            }

        } catch (error) {
            toast.error(error.message);

        }
        finally {
            setSubmitPopupOpen(false);
            setIsSubmitting(false);
        }
    }
    const getSubmissions = async (Data) => {
        setGetSubmmisonLoading(true);
        if (!Data) {
            alert("Task id must provived");
            return;
        }

        try {

            const result = await axios.post(`${backendUrl}/api/teacher/getsubmissions`, Data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }

            })

            if (result.data.success) {
                setSubmissions(result.data.submmisons)
            } else {
                toast.error(result.data.message);
            }


        } catch (error) {
            console.log(error.message)
        }
        finally {
            setGetSubmmisonLoading(false);
        }
    }
    const removeSubject = async (Data) => {
        try {
            const result = await axios.delete(`${backendUrl}/api/subject`, {
                data: Data,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (result.data.success) {
                setSubjects(prev => prev.filter(subject => subject._id !== Data.subjectId));
                toast.success(result.data.message);
            } else {

                toast.success(result.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.success(error.message);
        }

    }
    const getOtp = async (Data) => {
        console.log(Data)
        setemailPageLoading(true);
        try {
            const result = await axios.post(`${backendUrl}/api/user/getOtp`, Data, {
                withCredentials: true,
                headers: {
                    "Content-type": "application/json"
                }
            })
            console.log(result.data)

            if (result.data.success) {

                setStep(2);
            } else {
                toast.error(result.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);

        } finally {
            setemailPageLoading(false);
        }
    }
    const verifyOtp = async (Data)=>{
        setemailPageLoading(true);
        try {
        const result  = await axios.post(`${backendUrl}/api/user/resetpassword`,Data,{
            withCredentials:true,
            headers:{
             "Content-Type":"application/json"
            }
        })
        if(result.data.success){
            toast.success(result.data.message);
            window.location.href = "/home";
        }else{
            toast.error(result.data.message);
        }
            
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setemailPageLoading(false);
        }
    }
    useEffect(()=>{
        console.log(backendUrl)
    })
    const contextValue = {
        setUser,
        signupHandle,
        loginhandle,
        loginpgaeLoading,
        setLoginPageLoading,
        signupgaeLoading,
        setSignupageLoading,
        loggedIn, setLoggedIn, Logout,
        subjects, setSubjects,
        getSubjects, user,
        studenAddLoading, setStudentAddLoading,
        addStudent, loadingstudentList,
        students, getStudents, addSubjectLoading, addSubject,
        removeStudent, addTaskLoading, setAddTaskLoading, addTask,
        getTaskLoading, setGetTaskLoading, tasks, setTasks, getTasks,
        getSubjectLoading, setGetSubjectsLoading, removeTask, isAddTaskOpen, setAddTaskOpen,
        taskFormLoading, settaskFormLoading, isSubmitPopupOpen, setSubmitPopupOpen, submitTask,
        isSubmitting, setIsSubmitting, isPopupOpen, setPopupOpen, getSubmissions,
        getSubmmisonLoading, setGetSubmmisonLoading, submissions, removeSubject, emailPageLoading,
        step, setStep, getOtp,verifyOtp

    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
