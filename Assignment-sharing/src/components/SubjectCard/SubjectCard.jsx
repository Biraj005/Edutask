import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Store/ThemeContext";
import AddTaskPopup from "../AddTaskPopup/AddTaskPopup";
import StudentList from "../StudenList/StudentList";
import FindStudent from "../FindStudent/FindStudent";
import SubmitTaskPopup from "../SubmitTaskPopup/SubmitTaskPopup";
import FileViewer from "../Pdfviewer/Pdfviewer";
import "./SubjectCard.css";
import { AuthContext } from "../../Store/AuthContext";
import ViewSubmissionsPopup from "../ViewSubmission/ViewSubmissionsModal";

const SubjectCard = () => {
  const navigate = useNavigate();
  const { selectedSubject, setSelectedSubject } = useContext(ThemeContext);

  const {
    user,
    addStudent,
    removeStudent,
    addTask,
    removeTask,
    tasks,
    getTaskLoading,
    getTasks,
    isAddTaskOpen,
    setAddTaskOpen,
    isSubmitPopupOpen,
    setSubmitPopupOpen,
  } = useContext(AuthContext);

  const [isStudentListOpen, setStudentListOpen] = useState(false);
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [studentSearchResults, setStudentSearchResults] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pdfToView, setPdfToView] = useState(null);
  const [viewSubmissionsOpen, setViewSubmissionsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  useEffect(() => {
    if (!selectedSubject) navigate("/home");
  }, [selectedSubject, navigate]);

  if (!selectedSubject) return null;

  const handleBack = () => {
    setSelectedSubject(null);
    navigate("/home");
  };

  const handleAddTaskSubmit = (taskData) => {
    taskData.subject = selectedSubject._id;
    addTask(taskData);
  };

  const handleRemoveStudent = (studentToRemove) => {
    const data = {
      studentId: studentToRemove._id,
      subjectId: selectedSubject._id,
    };
    removeStudent(data);
  };

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
  };
   
  const handleAddStudent = (student) => {
    const updatedStudent = { ...student, code: selectedSubject.code };
    addStudent(updatedStudent);
    setStudentSearchResults(null);
    setAddStudentOpen(false);
  };

  const closeFindStudent = () => {
    setStudentSearchResults(null);
    setAddStudentOpen(false);
  };

  const handleTaskSubmitClick = (task) => {
    setSelectedTask(task);
    setSubmitPopupOpen(true);
  };

  const handleTaskClick = (task, type) => {
  

    if (type === 'task' && task.attachments) {
      setPdfToView(task.attachments);
    } else if(task=='task') {
      alert("No PDF attached for this task!");
      return;
    }
    if (type === 'submission' && task.fileUrl) {
      setPdfToView(task.fileUrl);

    } else if(type==='submission') {
      alert("No PDF attached for this task!");
      return;
    }

  };
const handleViewSubmissions = (taskId) => {
  setSelectedTaskId(taskId);
  setViewSubmissionsOpen(true);
};

 

  useEffect(() => {
    getTasks({ subject: selectedSubject._id });
  }, []);
  const StudentView = () => (
    <div className="tasks-section">
      <h4>All Tasks ({tasks?.length || 0})</h4>

      {getTaskLoading ? (
        <p className="no-tasks-msg">Getting tasks...</p>
      ) : tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span className="task-title-span">{task.title}</span>

              <div className="task-item-controls">
                <span className={`status-pill ${task.status}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>

                <button
                  className="action-btn view-task-btn"
                  onClick={() => handleTaskClick(task,'task')}
                >
                  View
                </button>

                {task.fileUrl && (
                  <button
                    className="action-btn view-submission-btn"
                    onClick={() => handleTaskClick(task,'submission')}
                  >
                    View Submission
                  </button>
                )}
                {task.status !== "expired" && (
                  <button
                    className="action-btn submit-task-btn"
                    onClick={() => handleTaskSubmitClick(task)}
                  >
                    {task.fileUrl ? "Resubmit" : "Submit"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks-msg">No tasks available.</p>
      )}
    </div>
  );

const TeacherView = () => (
  <>
    <div className="teacher-actions">
      <button
        className="action-btn student-list-btn"
        onClick={() => setStudentListOpen(true)}
      >
        Student List
      </button>

      <button
        className="action-btn add-student-btn"
        onClick={() => setAddStudentOpen(true)}
      >
        Add Student
      </button>
    </div>

    <div className="tasks-section">
      <h4>All Assigned Tasks ({tasks?.length || 0})</h4>

      {getTaskLoading ? (
        <p className="no-tasks-msg">Getting tasks...</p>
      ) : tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span className="task-title-span">{task.title}</span>

              <div className="task-item-controls">
                <span className={`status-pill ${task.status}`}>
                  {task.status}
                </span>

                <button
                  className="action-btn view-task-btn"
                  onClick={() => handleTaskClick(task, "task")}
                >
                  View
                </button>

                <button
                  className="action-btn view-submission-btn"
                  onClick={() => handleViewSubmissions(task._id)}
                >
                  View Submissions
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
      ) : (
        <p className="no-tasks-msg">No tasks available.</p>
      )}
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
      {viewSubmissionsOpen && (
      <ViewSubmissionsPopup
        taskId={selectedTaskId}
        onClose={() => setViewSubmissionsOpen(false)}
        onViewFile={(fileUrl) => setPdfToView(fileUrl)}
      />
    )}


      {isAddStudentOpen && (
        <div className="popup-overlay" onClick={closeFindStudent}>
          <div onClick={(e) => e.stopPropagation()}>
            <FindStudent
              onClose={closeFindStudent}
              results={studentSearchResults}
              onAddStudent={handleAddStudent}
            />
          </div>
        </div>
      )}

      {isSubmitPopupOpen && <SubmitTaskPopup task={selectedTask} />}
      {pdfToView && <FileViewer fileUrl={pdfToView} onClose={() => setPdfToView(null)} />}

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
            {user.role === "teacher" && (
              <button
                className="add-task-btn"
                title="Add New Task"
                onClick={() => setAddTaskOpen(true)}
              >
                +
              </button>
            )}
          </div>

          <div className="card-body">
            {user.role === "student" ? <StudentView /> : <TeacherView />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectCard;
