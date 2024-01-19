// ViewStudentPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/styles.css'; // Import the styles

const ViewStudentPage = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [studentId]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
  <div className="view-container">
  <h1>Student With Specifc ID Information is: </h1>
  <div>
    <p>ID: {studentData.id}</p>
    <p>Name: {studentData.full_name}</p>
    <p>Roll Number: {studentData.roll_number}</p>
    <p>Email: {studentData.email}</p>
    <p>Gender: {studentData.gender}</p>
    <p>Date of Birth: {studentData.date_of_birth}</p>
    <p>City: {studentData.city}</p>
    <p>Interest: {studentData.interest}</p>
    <p>Department: {studentData.department}</p>
    <p>Degree Title: {studentData.degree_title}</p>
    <p>Subject: {studentData.subject}</p>
    <p>Start Date: {studentData.start_date}</p>
    <p>End Date: {studentData.end_date}</p>
    {/* Add more fields as needed */}
  </div>
</div>

  );
};

export default ViewStudentPage;
