import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/home');
    };

    return (
        // <nav>
        //     <ul>
        //         {!email && (
        //             <>
        //                 <li><Link to="/register">Register</Link></li>
        //                 <li><Link to="/login">Login</Link></li>
        //             </>
        //         )}
        //         {email && (
        //             <>
        //                 <li><Link to="/admitcard">Download Admit Card</Link></li>
        //                 <li><button onClick={handleLogout}>Logout</button></li>
        //             </>
        //         )}
        //     </ul>
        // </nav>
        <nav class="navbar navbar-expand-lg navbar navbar-dark bg-primary">
            <div class="container-fluid1" style={{ display: 'flex', flexWrap: 'inherit', alignItems: 'center' }}>
    
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            {!email && (
                <>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" style={{ marginLeft: '25px !important' }} aria-current="page" href="/register">Register</a>
                            <a class="nav-link active" aria-current="page" href="/login">Login</a>
                        </div>
                    </div>
                </>
            )}
            {email && (
                <>
                    <a class="nav-link active" aria-current="page" href="/admitcard" style={{ marginLeft: '25px' }}>
                            Download Admit Card
                    </a>
                    <a class="nav-link active" aria-current="page" href="/instructions" style={{ marginLeft: '25px' }}>
                            Give Exam
                    </a>
                    <button class="btn btn-danger" onClick={handleLogout} style={{ marginLeft: '70vw' }}>
                        Log out
                    </button>
                </>
            )}
            </div>
        </nav>
        
    );
};

export default Navbar;
