import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/styles.css'; // Import the styles

const EditStudentPage = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetch(`${BASE_URL}/students/get_student/${studentId}`, {
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
        setStudentData(data);
        setUpdatedData({ ...data }); // Copy the data for editing
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [studentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`${BASE_URL}/students/update_student/${studentId}/`, {
      method: 'PUT', // Or use PATCH depending on your API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Student with ID ${studentId} updated successfully.`);
          // Perform any other actions upon successful update
        } else {
          throw new Error('Failed to update student.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-container">
      <h1>Edit Student Information</h1>
      <form>
  <label>
    Full Name:
    <input
      type="text"
      name="full_name"
      value={updatedData.full_name}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Roll Number:
    <input
      type="text"
      name="roll_number"
      value={updatedData.roll_number}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Email:
    <input
      type="email"
      name="email"
      value={updatedData.email}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Gender:
    <select
      name="gender"
      value={updatedData.gender}
      onChange={handleInputChange}
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </label>
  <label>
    Date of Birth:
    <input
      type="date"
      name="date_of_birth"
      value={updatedData.date_of_birth}
      onChange={handleInputChange}
    />
  </label>
  <label>
    City:
    <input
      type="text"
      name="city"
      value={updatedData.city}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Interest:
    <input
      type="text"
      name="interest"
      value={updatedData.interest}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Department:
    <input
      type="text"
      name="department"
      value={updatedData.department}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Degree Title:
    <input
      type="text"
      name="degree_title"
      value={updatedData.degree_title}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Subject:
    <input
      type="text"
      name="subject"
      value={updatedData.subject}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Start Date:
    <input
      type="date"
      name="start_date"
      value={updatedData.start_date}
      onChange={handleInputChange}
    />
  </label>
  <label>
    End Date:
    <input
      type="date"
      name="end_date"
      value={updatedData.end_date}
      onChange={handleInputChange}
    />
  </label>
  {/* Add other fields based on your student data */}
  <button type="button" onClick={handleUpdate}>
    Update
  </button>
</form>

    </div>
  );
};

export default EditStudentPage;
