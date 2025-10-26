import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Store/ThemeContext';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import StudentList from '../StudenList/StudentList';
import FindStudent from '../FindStudent/FindStudent';
import './SubjectCard.css';
import { AuthContext } from '../../Store/AuthContext';


const SubjectCard = () => {
    const navigate = useNavigate();
    const {  selectedSubject, setSelectedSubject, subjectsData, setSubjectsData } = useContext(ThemeContext);

        
    const {user,addStudent,removeStudent,addTask, removeTask,
        tasks,getTaskLoading,getTasks,isAddTaskOpen, setAddTaskOpen,
        taskFormLoading
    }  = useContext(AuthContext)

    const [isStudentListOpen, setStudentListOpen] = useState(false);
    const [isAddStudentOpen, setAddStudentOpen] = useState(false);
    const [studentSearchResults, setStudentSearchResults] = useState(null);

    useEffect(() => {
       
        if (!selectedSubject) {
            navigate("/home");
        }
    }, [selectedSubject, navigate]);

    if (!selectedSubject) {
        return null;
    }

    const handleBack = () => {
        setSelectedSubject(null);
        navigate("/home");
    };

    const handleAddTaskSubmit = (taskData) => {
        console.log('New Task Added:', taskData);
    
      //title,description,subject,deadline,attachments
       taskData.subject = selectedSubject._id;
       addTask(taskData);

        
    };

    const handleRemoveStudent = (studentToRemove) => {

        console.log(studentToRemove);
        const data={
            studentId:studentToRemove._id,
             subjectId:selectedSubject._id,
        }
        removeStudent(data);
        
    };
    const handleRemoveTask = (data)=>{

        removeTask(data);
    }

    const handleStudentSearch = (query) => {
        console.log("Searching for:", query);
    };
    
    const handleAddStudent = (student) => {
       const updatedStudent = {
        ...student,code:selectedSubject.code
       }
        addStudent(updatedStudent);

        setStudentSearchResults(null);
        setAddStudentOpen(false);
    };

    const closeFindStudent = () => {
        setStudentSearchResults(null);
        setAddStudentOpen(false);
    };
    const StudentView = () => (
        <div className="tasks-section">
            <h4>All Tasks ({tasks.length})</h4>
            {tasks.length > 0 ? (
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <span className="task-title-span">{task.title}</span>
                            <div className="task-item-controls">
                                <span className={`status-pill ${task.status}`}>{task.status}</span>
                                <button 
                                    className="action-btn view-task-btn" 
                                    onClick={() => handleTaskClick(task._id)}
                                >
                                    View
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : <p className="no-tasks-msg">{getTaskLoading ?"Getting tasks":"No tasks available."}</p>}
        </div>
    );

    const TeacherView = () => (
        <>
            <div className="teacher-actions">
                <button className="action-btn student-list-btn" onClick={() => setStudentListOpen(true)}>
                    Student List
                </button>
                <button className="action-btn add-student-btn" onClick={() => setAddStudentOpen(true)}>
                    Add Student
                </button>
            </div>
            <div className="tasks-section">
                <h4>All Assigned Tasks ({tasks.length})</h4>
                {tasks.length > 0 ? (
                    <ul className="task-list">
                        {tasks.map(task => (           
                            <li key={task._id} className="task-item">
                                <span className="task-title-span">{task.title}</span>
                                <div className="task-item-controls">
                                    <span className={`status-pill ${task.status}`}>{task.status}</span>
                                    <button 
                                        className="action-btn view-task-btn" 
                                        onClick={() => handleTaskClick(task._id)}
                                    >
                                        View
                                    </button>
                                    <button 
                                        className="action-btn remove-task-btn" 
                                        onClick={() => handleRemoveTask(task._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : <p className="no-tasks-msg">{getTaskLoading ?"Getting tasks":"No tasks available."}</p>}
            </div>
        </>
    );
    useEffect(()=>{
        getTasks({subject:selectedSubject._id});
        
    },[])
    useEffect(()=>{
        console.log(tasks)
    },[tasks])
    return (
        <>
            {isAddTaskOpen && (
                <AddTaskPopup
                    onClose={() => setAddTaskOpen(false)}
                    onSubmit={handleAddTaskSubmit}
                />
            )}

            {isStudentListOpen && (
                <div className="popup-overlay" onClick={() => setStudentListOpen(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <StudentList
                            students={selectedSubject.students || []}
                            onRemove={handleRemoveStudent}
                            onClose={() => setStudentListOpen(false)}
                        />
                    </div>
                </div>
            )}

            {isAddStudentOpen && (
                <div className="popup-overlay" onClick={closeFindStudent}>
                    <div onClick={(e) => e.stopPropagation()}>
                         <FindStudent 
                            onClose={closeFindStudent}
                            onSearch={handleStudentSearch}
                            results={studentSearchResults}
                            onAddStudent={handleAddStudent}
                         />
                    </div>
                </div>
            )}
            
            <div className="subject-card-page-container">
                <header className="subject-card-header">
                    <button className="back-btn-page" onClick={handleBack}>
                        &larr; All Subjects
                    </button>
                    <h2>{selectedSubject.name}</h2>
                    <div className="header-placeholder"></div>
                </header>
                <div className="subject-card single-view">
                    <div className="card-header">
                        <h3>{selectedSubject.code}</h3>
                        {user.role === 'teacher' && (
                            <button className="add-task-btn" title="Add New Task" onClick={() => setAddTaskOpen(true)}>+</button>
                        )}
                    </div>
                    <div className="card-body">
                        {user.role === 'student' ? <StudentView /> : <TeacherView />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectCard;
