import React, { useState, useContext } from "react";
import "./SubmitTaskPopup.css";
import { AuthContext } from "../../Store/AuthContext";

const SubmitTaskPopup = ({ task }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const { submitTask, isSubmitting, setSubmitPopupOpen } = useContext(AuthContext);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!file) {
      alert("Please upload a file ");
      return;
    }

    const formData = new FormData();
    formData.append("taskId", task._id);
    if (file) formData.append("file", file);
    if (text.trim()) formData.append("text", text);

    submitTask(formData);
  };

  return (
    <div className="popup-overlay" onClick={() => setSubmitPopupOpen(false)}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="submit-task-form">
          <h3>Submit Task: {task.title}</h3>

          <textarea
            placeholder="Write your answer or notes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="file-input-wrapper">
            {!file ? (
              <>
                <label htmlFor="fileUpload" className="file-input-label">
                  📎 Choose File
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.zip,.jpg,.png"
                  
                />
              </>
            ) : (
              <div className="file-display">
                <span className="file-name">{file.name}</span>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => setFile(null)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="popup-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setSubmitPopupOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitTaskPopup;
