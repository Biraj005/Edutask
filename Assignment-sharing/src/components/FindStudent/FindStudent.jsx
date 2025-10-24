import React, { useState } from 'react';
import './FindStudent.css';
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';

const FindStudent = ({ onSearch, onClose, onAddStudent }) => {
    const {selectedSubject} = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState({ name: '', department: '', email: '', roll: ''});
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {studenAddLoading,setStudentAddLoading,addStudent} = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery(prev => ({ ...prev, [name]: value }));
    };

    // const handleSearchClick = async () => {
    //     if (!searchQuery.name && !searchQuery.department && !searchQuery.email && !searchQuery.roll) {
    //         alert("Please enter at least one search field.");
    //         return;
    //     }
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const results = await onSearch(searchQuery);
    //         setSearchResults(results);
    //     } catch (err) {
    //         setError('Failed to fetch students. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return (
        <div className="find-student-container">
            <div className="find-student-header">
                <h2>Find Student</h2>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>

            <div className="search-form">
                <input type="text" name="name" placeholder="Search by Name" value={searchQuery.name} onChange={handleInputChange} />
                <input type="text" name="department" placeholder="Search by Department" value={searchQuery.department} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Search by Email" value={searchQuery.email} onChange={handleInputChange} />
                <input type="text" name="roll" placeholder="Search by Roll Number" value={searchQuery.roll} onChange={handleInputChange} />
                <button className="search-btn" onClick={()=>onAddStudent(searchQuery)} disabled={loading}>
                    {studenAddLoading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="search-results-wrapper">
                {loading && <p className="info-msg">Loading results...</p>}
                {error && <p className="error-msg">{error}</p>}
                
                {searchResults === null && !loading && !error && (
                    <p className="info-msg">Use the form to search for students in the database.</p>
                )}

                {searchResults && searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map(student => (
                            <div key={student.roll} className="student-result-item">
                                <div className="student-info">
                                    <span className="student-name">{student.name}</span>
                                    <span className="student-details">{student.department} | Passing Year: {student.passingYear}</span>
                                </div>
                                <button className="add-btn" onClick={() => onAddStudent(student)}>+</button>
                            </div>
                        ))}
                    </div>
                )}
                
                {searchResults && searchResults.length === 0 && !loading && !error && (
                    <p className="info-msg">No students found for this search.</p>
                )}
            </div>
        </div>
    );
};

export default FindStudent;