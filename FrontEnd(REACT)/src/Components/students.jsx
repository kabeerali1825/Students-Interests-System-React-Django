import React, { useState, useEffect } from "react";
import "../Styles/studentsTable.css";
import { Link } from "react-router-dom";
import FrontPage from "./homePage";
import ViewStudentPage from "./ViewStudentPage";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentsLength, setStudentsLength] = useState(0);
  const BASE_URL = 'http://127.0.0.1:8000';


  

  const studentDeleteWithId = (st_id) => {
    fetch(`${BASE_URL}/students/deletee_student/${st_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed (e.g., authorization tokens)
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Student with ID ${st_id} deleted successfully.`);
          // Update the students state by filtering out the deleted student
          setStudents(students.filter(student => student.st_ID !== st_id));
        } else {
          throw new Error('Failed to delete student.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  useEffect(() => {
    // Fetch all students
    fetch('http://127.0.0.1:8000/students/all_students/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // Handle the retrieved data as needed
        setStudents(data); // Update the students state with fetched data
        setStudentsLength(data.length);
        const totalPagesCount = Math.ceil(data.length / pageSize);
        setTotalPages(totalPagesCount);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  }, [pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, students.length);

  return (
    <div>
      <div className="header">
        <h1>Student Interests System</h1>
      </div>

      <div className="navbarDiv">
        <nav className="navbar">
          <h2>Students</h2>
          <div className="links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/addStudent">Add Student</Link>
          </div>
        </nav>
        <div className="dropdown">
          <label htmlFor="pageSize">Page Size:</label>
          <select
            id="pageSize"
            value={pageSize}
            className="page-size-dropdown"
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <div className="page-navigation">
            <button onClick={() => handlePageChange(1)}>&lt;&lt;</button>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              &lt;
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              &gt;
            </button>
            <button onClick={() => handlePageChange(totalPages)}>
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Interest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.slice(startIndex, endIndex).map((student, index) => (
            <tr key={student.id}>
              
              <td>{index + 1}</td>
              <td>{student.full_name}</td>
              <td>{student.roll_number}</td>
              <td>{student.department}</td>
              <td>{student.date_of_birth}</td>
              <td>{student.city}</td>
              <td>{student.interest}</td>
              <td>
              <Link
              to={`/students/get_student/${student.st_ID}`} // Assuming the route accepts the student ID as a parameter
              className="action-link">View</Link>
                |{" "}
                <Link to={`/students/update_student/${student.st_ID}`}className="action-link">
                  Edit
                </Link>{" "}
                |{" "}
                <Link to="/students" className="action-link" onClick={studentDeleteWithId(student.st_ID)}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
