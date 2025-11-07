import React, { useContext, useState } from 'react';
import './AddSubjectPopup.css';
import { AuthContext } from '../../Store/AuthContext';

const AddSubjectPopup = ({  onSubmit }) => {

    const {addSubjectLoading,addSubject, setPopupOpen} =useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '', 
        semester: '',
        code: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.semester || !formData.code) {
            alert('Please fill out all fields.');
            return;
        }
        addSubject(formData);
     
    };

    return (
        <div className="popup-overlay" >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>Add New Subject</h2>
                    <button onClick={()=>setPopupOpen(false)} className="close-btn" >&times;</button>
                </div>
                <form className="add-subject-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Subject Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Data Structures"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter a brief description of the subject"
                            rows="3"
                            required
                        />
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="semester">Semester</label>
                        <input
                            type="number"
                            id="semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            placeholder="e.g., 3"
                            min="1"
                            max="8"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="code">Paper Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="e.g., CSE-201"
                            required
                        />
                    </div>
                    <button type="submit" className="create-subject-btn">
                        {addSubjectLoading ?"Adding subject..." :"Create Subject"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSubjectPopup;