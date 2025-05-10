import { useState } from 'react';
import AuthModal from './AuthModal';

function StudentForm({ onAddStudent, isLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (name && email && course) {
      const newStudent = { name, email, course };
      await onAddStudent(newStudent);
      setName('');
      setEmail('');
      setCourse('');
    }
  };

  return (
    <div className="student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <select 
            className="form-control" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            required
          >
            <option value="">Select Course</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Node.js">Node.js</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          {isLoggedIn ? 'Add Student' : 'Login to Add Student'}
        </button>
      </form>

      {showLoginModal && !isLoggedIn && (
        <AuthModal 
          onLogin={() => setShowLoginModal(false)} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </div>
  );
}

export default StudentForm;