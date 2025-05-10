function StudentList({ students, filterCourse }) {
  const filteredStudents = filterCourse 
    ? students.filter(student => student.course === filterCourse)
    : students;

  return (
    <div className="student-list">
      <h2>Students</h2>
      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;