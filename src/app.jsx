import { useState, useEffect } from 'react'
import './App.css'
import { auth } from './firebase/config'
import { ThemeProvider } from './context/ThemeContext'
import AuthModal from './components/AuthModal'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import ThemeToggle from './components/ThemeToggle'
// import mockApi from './components/mockApi'

const mockStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', course: 'React' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'JavaScript' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', course: 'React' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', course: 'Node.js' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', course: 'JavaScript' },
]

const mockApi = {
  getStudents: () => new Promise((resolve) => setTimeout(() => resolve(mockStudents), 1000)),
  addStudent: (student) => new Promise((resolve) => {
    const newStudent = { ...student, id: mockStudents.length + 1 }
    mockStudents.push(newStudent)
    setTimeout(() => resolve(newStudent), 500)
  })
}

// Main App Component
function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCourse, setFilterCourse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await mockApi.getStudents();
        setStudents(data);
      } catch {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStudent = async (newStudent) => {
    try {
      const addedStudent = await mockApi.addStudent(newStudent);
      setStudents([...students, addedStudent]);
      return true;
    } catch {
      setError('Failed to add student');
      return false;
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
    } catch {
      setError('Failed to log out');
    }
  };

  const courses = ['', ...new Set(students.map(student => student.course))];

  return (
    <ThemeProvider>
      <div className="container">
        <header className="app-header">
          <h1>Student Dashboard</h1>
          <div className="header-controls">
            <ThemeToggle />
            <div className="auth-buttons">
              {isLoggedIn ? (
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-outline-primary" onClick={() => setShowLoginModal(true)}>
                  Login
                </button>
              )}
            </div>
          </div>
        </header>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="dashboard-container">
          <div className="filter-container">
            <label htmlFor="courseFilter">Filter by Course:</label>
            <select 
              id="courseFilter"
              className="form-control" 
              value={filterCourse} 
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.filter(Boolean).map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="main-content">
            <div className="row">
              <div className="col-md-8">
                {loading ? (
                  <p>Loading students...</p>
                ) : (
                  <StudentList students={students} filterCourse={filterCourse} />
                )}
              </div>
              <div className="col-md-4">
                <StudentForm 
                  onAddStudent={handleAddStudent} 
                  isLoggedIn={isLoggedIn} 
                />
              </div>
            </div>
          </div>
        </div>

        {showLoginModal && !isLoggedIn && (
          <AuthModal 
            onLogin={handleLogin} 
            onClose={() => setShowLoginModal(false)} 
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
