import React from 'react';
import './StudentList.css'
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';
import { useEffect } from 'react';
import { ThemeContext } from '../../Store/ThemeContext';

const StudentList = ({  onRemove, onClose }) => {

    const {selectedSubject}  = useContext(ThemeContext); 
    const {students,loadingstudentList, getSubjects,getStudents} = useContext(AuthContext);
    useEffect(()=>{
        getStudents(selectedSubject.code);
        console.log(students)
    },[])   
    return (
        <div className="student-list-container">
            <div className="student-list-header">
                <h2 className="student-list-title">Enrolled Students</h2>
                <button className="close-student-list-btn" onClick={onClose}>
                    &times;
                </button>
            </div>
            {students && students.length > 0 ? (
                <ul className="student-list">
                    {students.map((student, index) => (
                        <li key={index} className="student-item">
                            <div className="student-info">
                                <span className="student-avatar">{student.name[0]}</span>
                                <span className="student-name">{student.name}</span>
                            </div>
                            <button
                                className="remove-student-btn"
                                title={`Remove ${student}`}
                                onClick={() => onRemove(student)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-students-msg">{!loadingstudentList ?"No students are currently enrolled in this subject.":"Loading...."}</p>
            )}
        </div>
    );
};

export default StudentList;