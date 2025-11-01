import './SubjectList.css';
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';

const SubjectList = ({ subjects, onSelect, useruserType }) => {
  const { getSubjectLoading, setGetSubjectsLoading ,removeSubject} = useContext(AuthContext);

  const handelRemoveCLick = (subject) => {
    removeSubject({subjectId:subject._id})
  };

  return (
    <div className="subject-list-container">
      <div className="subject-list">
        {subjects.map((subject) => (
          <div className="subject-item" key={subject.code}>
            <div 
              className="subject-clickable-area" 
              onClick={() => onSelect(subject)}
            >
              <div className="subject-code">{subject.code}</div>
              <div className="subject-details">
                <h3 className="subject-name">{subject.name}</h3>
                <p className="subject-description">{subject.description}</p>
              </div>
            </div>

            {useruserType === 'teacher' && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // just in case
                  handelRemoveCLick(subject);
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
