const mockStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', course: 'React' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'JavaScript' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', course: 'React' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', course: 'Node.js' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', course: 'JavaScript' },
];

const mockApi = {
  getStudents: () => new Promise((resolve) => setTimeout(() => resolve([...mockStudents]), 1000)),
  addStudent: (student) => new Promise((resolve) => {
    const newStudent = { ...student, id: mockStudents.length + 1 };
    mockStudents.push(newStudent);
    setTimeout(() => resolve(newStudent), 500);
  })
};

export default mockApi;