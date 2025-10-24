import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
    const [selectedSubject, setSelectedSubject] = useState(null);

    const user = {
        name: "Biraj Roy",
        email: "biraj@example.com",
        role: "student",
    };

    const initialSubjects = [
        {
            code: "CSE-201",
            name: "Data Structures & Algorithms",
            description: "A deep dive into fundamental data structures...",
            pendingTasks: 2,
            students: [ 
                "Alice Johnson",
                "Bob Williams",
                "Charlie Brown",
                 "Alice Johnson",
                "Bob Williams",
                "Charlie Brown",
                 "Alice Johnson",
                "Bob Williams",
                "Charlie Brown",
                 "Alice Johnson",
                "Bob Williams",
                "Charlie Brown",
            ],
            tasks: [
                { id: 1, title: "Implement a Red-Black Tree", status: "Pending" },
                { id: 2, title: "Dijkstra's Algorithm Assignment", status: "Pending" },
                { id: 3, title: "Quiz on Big-O Notation", status: "Completed" },
            ],
        },
        {
            code: "ITC-101",
            name: "Python Programming",
            description: "Introduction to programming concepts...",
            pendingTasks: 0,
            students: [ 
                "Alice Johnson",
                "Bob Williams",
                "Charlie Brown",
            ],
            tasks: [
                { id: 6, title: "Final Project: Web Scraper", status: "Completed" },
            ],
        },
    ];

    const [subjectsData, setSubjectsData] = useState(initialSubjects);

    const contextValue = {
        user,
        subjectsData,
        setSubjectsData,
        selectedSubject,
        setSelectedSubject
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};