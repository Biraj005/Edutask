import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Store/ThemeContext';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import StudentList from '../StudenList/StudentList';
import FindStudent from '../FindStudent/FindStudent';
import './SubjectCard.css';

const SubjectCard = () => {
    const navigate = useNavigate();
    const { user, selectedSubject, setSelectedSubject, subjectsData, setSubjectsData } = useContext(ThemeContext);
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
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

    const pendingTasks = selectedSubject.tasks.filter(task => task.status === 'Pending');
    const previousTasks = selectedSubject.tasks.filter(task => task.status === 'Completed');

    const handleBack = () => {
        setSelectedSubject(null);
        navigate("/home");
    };

    const handleAddTaskSubmit = (taskData) => {
        console.log('New Task Added:', taskData);
        setAddTaskOpen(false);
    };

    const handleRemoveStudent = (studentToRemove) => {
        if (window.confirm(`Are you sure you want to remove ${studentToRemove}?`)) {
            const updatedSubjectsData = subjectsData.map(subject => {
                if (subject.code === selectedSubject.code) {
                    const updatedStudents = subject.students.filter(s => s !== studentToRemove);
                    return { ...subject, students: updatedStudents };
                }
                return subject;
            });

            setSubjectsData(updatedSubjectsData);

            const updatedSelectedSubject = updatedSubjectsData.find(s => s.code === selectedSubject.code);
            setSelectedSubject(updatedSelectedSubject);
        }
    };

    const handleStudentSearch = (query) => {
        console.log("Searching for:", query);
        setTimeout(() => {
            const mockResults = [
                { name: 'Diana Miller', department: 'IT', passingYear: 2024, roll: '21IT001' },
                { name: 'David Clark', department: 'IT', passingYear: 2025, roll: '22IT045' },
            ];
            setStudentSearchResults(mockResults);
        }, 1000);
    };
    
    const handleAddStudent = (student) => {
        
        console.log(`Adding ${student.name} to this subject.`);
        setStudentSearchResults(null);
        setAddStudentOpen(false);
    };

    const closeFindStudent = () => {
        setStudentSearchResults(null);
        setAddStudentOpen(false);
    };

    const StudentView = () => (
        <>
            <div className="tasks-section">
                <h4>Pending Tasks ({pendingTasks.length})</h4>
                {pendingTasks.length > 0 ? (
                    <ul className="task-list">
                        {pendingTasks.map(task => (
                            <li key={task.id} className="task-item">
                                <span>{task.title}</span>
                                <button className="submit-btn">Submit</button>
                            </li>
                        ))}
                    </ul>
                ) : <p className="no-tasks-msg">No pending tasks. Great job! ✨</p>}
            </div>
            <div className="tasks-section">
                <h4>Previous Tasks ({previousTasks.length})</h4>
                {previousTasks.length > 0 ? (
                    <ul className="task-list">
                        {previousTasks.map(task => (
                            <li key={task.id} className="task-item completed">
                                <span>{task.title}</span>
                                <span className="status-pill completed">Completed</span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="no-tasks-msg">No completed tasks yet.</p>}
            </div>
        </>
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
                <h4>All Assigned Tasks ({selectedSubject.tasks.length})</h4>
                {selectedSubject.tasks.length > 0 ? (
                    <ul className="task-list">
                        {selectedSubject.tasks.map(task => (
                            <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
                                <span>{task.title}</span>
                                <span className={`status-pill ${task.status.toLowerCase()}`}>{task.status}</span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="no-tasks-msg">No tasks assigned for this subject yet.</p>}
            </div>
        </>
    );

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