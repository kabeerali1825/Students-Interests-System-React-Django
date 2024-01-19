import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "../Styles/addStudentStyles.css"; // Import the CSS file
import { Link } from "react-router-dom";

const FrontPage = () => {
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [dob, setDob] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [iinterests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [interest, setInterest] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const cities = [
    "Select City",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Karachi",
    "Quetta",
    "Peshawar",
    "Other",
  ];
  const interests = [
    "Travel",
    "Reading",
    "Writing",
    "Coding",
    "Painting",
    "Sketching",
    "Driving",
    "Bowling",
    "Poetry",
    "Hoteling",
    "other"
  ];
// Fetch all students data to extract interests
  useEffect(() => {
    
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
        // Extract unique interests from the fetched data
        const uniqueInterests = [...new Set(data.map(student => student.interest))];
        setInterests(uniqueInterests); // Set the unique interests to populate the dropdown
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);

  const handleInterestChange = (e) => {
    const selectedInterest = e.target.value;
    if (selectedInterest === "Other") {
      setInterest(""); // Reset the selected interest when "Other" is selected
    } else {
      setInterest(selectedInterest);
    }
  };

  const handleCustomInterestChange = (e) => {
    setCustomInterest(e.target.value);
  };


  
  const handleCancel = () => {
    console.log("Cancel button clicked!");
    setFullName("");
    setRollNo("");
    setEmail("");
    setSubject("");
    setGender("");
    setDepartment("");
    setDegree("");
    setDob("");
    setStartDate("");
    setEndDate("");
    setSelectedCity("");
    setInterest("");
    setNewInterest("");
    setError("");
    setMessage("");
  
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
        console.log('All Students:', data);
        // Handle the retrieved data as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Extracts the YYYY-MM-DD part
  };
  
  const handleCreate = () => {
    console.log("Create button clicked!");
    history.push("/students");
  let finalInterest = interest;
  if (interest === "Other" && customInterest.trim() !== "") {
    finalInterest = customInterest.trim();
  }

  const data = {
    full_name: fullName,
    roll_number: rollNo,
    email: email,
    gender: gender,
    date_of_birth: formatDate(dob), // Format date of birth
    city: selectedCity,
    interest: interest,
    department: department,
    degree_title: degree,
    subject: subject,
    start_date: formatDate(startDate), // Format start date
    end_date: formatDate(endDate), // Format end date
  };
  
    fetch('http://127.0.0.1:8000/students/add_student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
        throw new Error('Network response was not ok.');
      })
      .then((responseData) => {
        console.log('Success:', responseData);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };
  return (
    <div>
      <div className="header">
        <h1>Student Interests System</h1>
      </div>

      <div className="navbarDiv">
        <nav className="navbar">
          <h2>Add Student</h2>
          <div className="links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/students">Students List</Link>
          </div>
        </nav>
      </div>

      <div className="vertical-container">
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <div className="container">
            {/* Full Name */}
            <div>
              <label className="label" htmlFor="fullName">
                Full Name:
              </label>
              <input
                className="input-field"
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Roll No */}
            <div>
              <label className="label" htmlFor="rollNo">
                Roll No:
              </label>
              <input
                className="input-field"
                type="text"
                id="rollNo"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                className="input-field"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

          <div className="form-group">
            <div>
              <label className="label" htmlFor="gender">
                Gender:
              </label>
              <select
              className="input-field"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="label" htmlFor="dob">
                Date of Birth:
              </label>
              <DatePicker
              className="input-field"
                id="dob"
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="dd/MM/yyyy" // Set the desired date format
                placeholderText="DD/MM/YYYY" // Set the initial placeholder text
              />
            </div>

            {/* City Dropdown */}
            <div>
              <label className="label" htmlFor="city">
                City:
              </label>
              <select
              className="input-field"
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="interests">
                Interest:
              </label>
              <select
              className="input-field"
                id="interest"
                value={interest}
                onChange={handleInterestChange}
              >
                <option value="">Select an Option</option>
                {interests.map((tempInterest, index) => (
                  <option key={index} value={tempInterest}>
                    {tempInterest}
                  </option>
                ))}
              </select>
              {interest === "Other" && (
          <input
          className="input-field"
            type="text"
            id="customInterest"
            value={customInterest}
            onChange={handleCustomInterestChange}
            placeholder="Enter your interest"
          />)}
            </div>
            <div>
              <label className="label" htmlFor="newInterest">
                New Interest:
              </label>
              <input
              className="input-field"
                type="text"
                id="newInterest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                //disabled={!!interest} // Disable input field if an interest is selected from the dropdown
              />
            </div>
            </div>
            <div>
              <label className="label" htmlFor="department">
                Department:
              </label>
              <select
              className="input-field"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div>
              <label className="label" htmlFor="degree">
                Degree Title:
              </label>
              <select
              className="input-field"
                id="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelors Degree">Bachelors Degree</option>
                <option value="M.Phil Degree">M.Phil Degree</option>
                <option value="Post-Graduate Degree">
                  Post-Graduate Degree
                </option>
                <option value="Doctorate">Doctorate</option>
                <option value="Post-Doctorate">Post-Doctorate</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="subject">
                Subject:
              </label>
              <input
                className="input-field"
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="startDate">
                Start Date:
              </label>
              <DatePicker
              className="input-field"
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy" // Set the desired date format
                placeholderText="DD/MM/YYYY" // Set the initial placeholder text
              />
            </div>
            <div>
              <label className="label" htmlFor="endDate">
                End Date:
              </label>
              <DatePicker
              className="input-field"
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy" // Set the desired date format
                placeholderText="DD/MM/YYYY" // Set the initial placeholder text
              />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button" onClick={handleCreate} >
            Create
          </button>
          <button className="button button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
  );
};

export default FrontPage;
