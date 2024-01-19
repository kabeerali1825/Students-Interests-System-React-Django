import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css"; // Import your CSS file
import LoginImage from "../assets/login.png"
import WelcomeImage from "../assets/exit.png"

const Users = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/students/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError(data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      // Handle fetch errors
      setError('Error occurred while logging in');
      setIsLoggedIn(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic goes here
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and Password are required.");
      return;
    }
    // Simulating login for demonstration purposes
    // In a real app, you'd perform authentication here
    setIsLoggedIn(true);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="main-container">
      <div>
      <div className="header">
        <h1>{isLoggedIn ? "Welcome to Student Interest System" : "User Login"}</h1>
          {!isLoggedIn && (
            <img src={LoginImage} style={{ width: '100px', height: '100px' }}></img>
          )}
      </div>

      <div className="navbarDiv">
        <nav className="navbar">
          <h2>{isLoggedIn ? "" : "Please Enter Details"}</h2>
          {isLoggedIn && (
            <img src={WelcomeImage} style={{ width: '150px', height: '150px' }}></img>
          )}
          <div className="links">
            {isLoggedIn && (
              <div className="navbarDiv">
              <nav className="navbar">
                <Link to ="/addStudent"><h2 className="add-button" style={{color:"#03045e"}}>Add Student</h2></Link>
                <div className="links">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/students">Students List</Link>
                </div>
              </nav>
            </div>
            )}
          </div>
        </nav>
      </div>

      <div className="container">
        {!isLoggedIn && error && <p className="error-message">{error}</p>}
        {!isLoggedIn && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <label className="label" htmlFor="username">
                  Username:
                </label>
                <input
                  className="input-field"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="input-field"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="button-container">
              <button className="button" type="submit">
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Users;
