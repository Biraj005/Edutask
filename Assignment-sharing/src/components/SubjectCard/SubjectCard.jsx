import React from 'react';
import './SubjectCard.css';

const SubjectCard = ({ subject, userRole, onBack }) => {
  const pendingTasks = subject.tasks.filter(task => task.status === 'Pending');
  const previousTasks = subject.tasks.filter(task => task.status === 'Completed');

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
        <button className="action-btn student-list-btn">Student List</button>
        <button className="action-btn add-student-btn">Add Student</button>
      </div>

      <div className="tasks-section">
        <h4>All Assigned Tasks ({subject.tasks.length})</h4>
        {subject.tasks.length > 0 ? (
          <ul className="task-list">
            {subject.tasks.map(task => (
              <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
                <span>{task.title}</span>
                <span className={`status-pill ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        ) : <p className="no-tasks-msg">No tasks assigned for this subject yet.</p>}
      </div>
    </>
  );

  return (
    <div className="subject-card single-view">
      <div className="card-header">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Subjects
        </button>
        {userRole === 'teacher' && (
          <button className="add-task-btn" title="Add New Task">+</button>
        )}
      </div>
      <div className="card-body">
        {userRole === 'student' ? <StudentView /> : <TeacherView />}
      </div>
    </div>
  );
};

export default SubjectCard;