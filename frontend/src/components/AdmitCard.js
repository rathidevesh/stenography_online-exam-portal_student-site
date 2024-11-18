import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentInfo from './StudentInfo';
import './AdmitCard.css'

const AdmitCard = () => {

    const email = localStorage.getItem('email');

    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/candidate/${email}`);
                setStudent(...res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchStudentData();
        // console.log(student)
    }, [email])
    
    if (!email) {
        return <p>You cannot access this page</p>
    }

    return (
        <div className='dataCardContainer'>
            <div className='admitCardContainer'>
                <h2>Admit Card</h2>
                <div>
                    <span>First Name: </span>
                    <span>{student.firstName}</span>
                </div>
                <div>
                    <span>Last Name: </span>
                    <span>{student.lastName}</span>
                </div>
                <div>
                    <span>Date Of Birth: </span>
                    <span>{student.dateOfBirth}</span>
                </div>
                <div>
                    <span>City: </span>
                    <span>{student.city}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{student.email}</span>
                </div>
                <div>
                    <span>Exam: </span>
                    <span>{student.examId}</span>
                </div>
            </div>
            <div className='btns'>
                {/* <button onClick={() => navigate('/')}>Back</button> */}
                <button>
                    <PDFDownloadLink document={<StudentInfo student={student} />} fileName="document.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download'
                        }
                    </PDFDownloadLink>
                </button>
            </div>
        </div>
    );
}

export default AdmitCard;
