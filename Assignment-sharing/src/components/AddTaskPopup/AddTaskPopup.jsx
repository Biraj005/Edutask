import React, { useState } from 'react';
import './AddTaskPopup.css';
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';
import { ThemeContext } from '../../Store/ThemeContext';

const AddTaskPopup = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [file, setFile] = useState(null);
    const { taskFormLoading} =  useContext(AuthContext);
  

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert('Please provide a task title and a due date.');
            return;
        }
        // addTask({
        //     title,description,deadline: dueDate,
        //     subject: sele
        // })
        onSubmit({
            title,
            description,
            deadline: dueDate, 
            file
        });
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>Add New Task</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form className="add-task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Final Lab Report"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add more details about the task..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Attach File (Optional)</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                value=""
                            />
                            <label htmlFor="file" className="file-input-label">
                                {file ? (
                                    <div className="file-display">
                                        <span className="file-name" title={file.name}>{file.name}</span>
                                        <button
                                            type="button"
                                            className="remove-file-btn"
                                            onClick={handleRemoveFile}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ) : (
                                    'Choose a file...'
                                )}
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="create-task-btn">
                        { taskFormLoading ? "Submitting..":"Add task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPopup;
