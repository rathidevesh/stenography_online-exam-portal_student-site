import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reister.css'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      alert('Please fill in all fields');
    } else {
      try {
        const res = await axios.post("http://localhost:8800/registeruser1", { email, password });
        if (res.status === 201) {
          alert("Registered Successfully!!");
        }
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div className='registerContainer'>
      <form className='registerForm' onSubmit={handleRegister}>
        <h1>Register</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
