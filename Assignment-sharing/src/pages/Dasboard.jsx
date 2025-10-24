import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectList from '../components/SubjectList/Subjectlist';
import Sidebar from '../components/Sidbar/Sidebar';
import AddSubjectPopup from '../components/Addsubject/AddSubjectPopup';
import './Dashboard.css';
import { ThemeContext } from '../Store/ThemeContext';
import { AuthContext } from '../Store/AuthContext';
import { useEffect } from 'react';


const Dashboard = () => {

    const { loggedIn,getSubjects} = useContext(AuthContext);

    
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
     useEffect(()=>{
        async function init() {
             await getSubjects();
        }
        init();
     },[])

  

    const navigate = useNavigate();
    const { subjectsData, 
           setSubjectsData, setSelectedSubject 
    } = useContext(ThemeContext);
   const {user,subjects,setSubjects} = useContext(AuthContext);

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        navigate("/subject");
    };

    const handleAddSubject = (newSubjectData) => {
        setSubjects(prev => [...prev, { ...newSubjectData, pendingTasks: 0, tasks: [] }]);
        setPopupOpen(false);
    };

      useEffect(()=>{ 

       

    },[]) 
    return (
        <div className="dashboard-container">
            {isSidebarOpen && <Sidebar user={user} onClose={() => setSidebarOpen(false)} />}
            {isPopupOpen && <AddSubjectPopup onClose={() => setPopupOpen(false)} onSubmit={handleAddSubject} />}

            <header className="dashboard-header">
                <div className="dashboard-title-group">
                    <h2 className="dashboard-title">Subjects</h2>
                    {user.role === 'teacher' && (
                        <button className="add-subject-btn" onClick={() => setPopupOpen(true)}>
                            + Add Subject
                        </button>
                    )}
                </div>
                <div className="profile-avatar-container" onClick={() => setSidebarOpen(true)}>
                    <div className="profile-avatar">{user.name[0]}</div>
                </div>
            </header>

            <main>
                {subjects.length>0 ? (
                    <SubjectList
                        subjects={subjects}
                        onSelect={handleSubjectSelect}
                        useruserType={user.userType}
                    />
                ) : (
                    <div className="no-subjects-container">
                        <p>No subject is allocated yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;