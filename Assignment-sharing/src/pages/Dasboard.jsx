import React, { useState } from 'react';
import SubjectList from '../components/SubjectList/Subjectlist';
import SubjectCard from '../components/SubjectCard/SubjectCard';
import Sidebar from '../components/Sidbar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const user = {
        name: "Biraj Roy",
        email: "biraj@example.com",
        role: "teacher",
    };

    const subjectsData = [
        {
            code: "CSE-201",
            name: "Data Structures & Algorithms",
            description: "A deep dive into fundamental data structures and algorithmic techniques for efficient problem-solving.",
            pendingTasks: 2,
            tasks: [
                { id: 1, title: "Implement a Red-Black Tree", status: "Pending" },
                { id: 2, title: "Dijkstra's Algorithm Assignment", status: "Pending" },
                { id: 3, title: "Quiz on Big-O Notation", status: "Completed" },
            ],
        },
        {
            code: "CSE-203",
            name: "Computer Organization",
            description: "Understanding the basic components of computer systems and how they interact at a low level.",
            pendingTasks: 1,
            tasks: [
                { id: 4, title: "Design a 4-bit ALU in Logisim", status: "Pending" },
                { id: 5, title: "Lab Report on MIPS Assembly", status: "Completed" },
            ],
        },
        {
            code: "ITC-101",
            name: "Python Programming",
            description: "Introduction to programming concepts and paradigms using the Python language.",
            pendingTasks: 0,
            tasks: [
                { id: 6, title: "Final Project: Web Scraper", status: "Completed" },
                { id: 7, title: "API Integration Assignment", status: "Completed" },
            ],
        },
        {
            code: "ECE-205",
            name: "Digital Electronics",
            description: "Fundamentals of digital logic, circuits, and design using gates and flip-flops.",
            pendingTasks: 1,
            tasks: [
                { id: 8, title: "Karnaugh Map Simplification Worksheet", status: "Pending" },
            ],
        },
        {
            code: "CSE-301",
            name: "Operating Systems",
            description: "Core concepts of process management, memory management, and file systems.",
            pendingTasks: 0,
            tasks: [],
        },
    ];
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
    };

    const handleGoBack = () => {
        setSelectedSubject(null);
    };

    return (
        <div className="dashboard-container">
            {isSidebarOpen && <Sidebar user={user} onClose={() => setSidebarOpen(false)} />}

            <header className="dashboard-header">
                <div className="dashboard-title-group">
                    <h2 className="dashboard-title">
                        {selectedSubject ? selectedSubject.name : 'Subjects'}
                    </h2>
                    {!selectedSubject && user.role === 'teacher' && (
                        <button
                            className="add-subject-btn"
                            onClick={() => alert('Open form to add a new subject!')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add Subject
                        </button>
                    )}
                </div>

                <div
                    className="profile-avatar-container"
                    title={`${user.name}\n${user.email}`}
                    onClick={() => setSidebarOpen(true)}
                >
                    <div className="profile-avatar">{user.name[0]}</div>
                </div>
            </header>

            <main>
              
                {subjectsData.length > 0 ? (
                  
                    selectedSubject ? (
                        <SubjectCard
                            subject={selectedSubject}
                            userRole={user.role}
                            onBack={handleGoBack}
                        />
                    ) : (
                        <SubjectList
                            subjects={subjectsData}
                            onSelect={handleSubjectSelect}
                        />
                    )
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