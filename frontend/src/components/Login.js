import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('email:', email);
        localStorage.setItem("email", email);
        console.log('Password:', password);

        if (!email || !password) {
            alert('Please fill in all fields');
        } else {
            try {
                const res = await axios.post("http://localhost:8800/login", { email, password });
                if (res.status === 200) {
                    alert("Login Successfully!!");
                    navigate('/home');
                }
            } catch (error) {
                console.log(error);
                alert("Something Went Wrong");
            }
        }
    };

    return (
        <div className='loginContainer'>
            <form className='loginForm' onSubmit={handleRegister}>
                <h1>Login</h1>
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

export default Login;
