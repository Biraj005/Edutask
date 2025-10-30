import './SubjectList.css';
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';
import { ThemeContext } from '../../Store/ThemeContext';


const SubjectList = ({ subjects, onSelect ,useruserType}) => {
  
  const {getSubjectLoading,setGetSubjectsLoading} = useContext(AuthContext);

  return (
    <div className="subject-list-container">
      <div className="subject-list">
        {subjects.map((subject) => (
          
          <div 
            className="subject-item" 
            key={subject.code} 
            onClick={() => onSelect(subject)}
          >
            <div className="subject-code">{subject.code}</div>
            <div className="subject-details">
              <h3 className="subject-name">{subject.name}</h3>
              <p className="subject-description">{subject.description}</p>
            </div>
            {useruserType==='teacher' &&(
              <button>Remove</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;