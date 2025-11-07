import React, { useContext, useEffect, useState } from "react";
import "./ViewSubmissionsModal.css";
import { AuthContext } from "../../Store/AuthContext";

const ViewSubmissionsPopup = ({ taskId, onClose, onViewFile }) => {
   
    const { getSubmissions,
        getSubmmisonLoading, submissions } = useContext(AuthContext);

    useEffect(() => {
        getSubmissions({ taskId });
    }, [taskId]);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content submissions-popup" onClick={(e) => e.stopPropagation()}>
                <div className="submissions-popup-header">
                    <h3 className="submissions-popup-title">Submissions</h3>
                    <button className="close-submissions-btn" onClick={onClose}>✕</button>
                </div>

                {getSubmmisonLoading ? (
                    <p className="loading-submissions">Loading submissions...</p>
                ) : submissions.length === 0 ? (
                    <p className="no-submissions-msg">No submissions yet.</p>
                ) : (
                    <ul className="submission-list">
                        {submissions.map((sub) => (
                            <li key={sub._id} className="submission-item">
                                <div className="submission-info">
                                    <span className="submission-student-name">{sub?.name}</span>
                        
                                </div>
                                <div className="submission-actions">
                                    {sub.fileUrl ? (
                                        <button
                                            className="view-file-btn"
                                            onClick={() => onViewFile(sub.fileUrl)}
                                        >
                                            View File
                                        </button>
                                    ) : (
                                        <span>No file</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

export default ViewSubmissionsPopup;
