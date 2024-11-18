// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './FetchQuestions.css';  // Ensure that you link the CSS file properly

// // const FetchQuestions = () => {
// //   const [questions, setQuestions] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [answers, setAnswers] = useState({});

// //   useEffect(() => {
// //     const email = localStorage.getItem('email');
    
// //     if (email) {
// //       axios.post('http://localhost:8800/fetch-question', { email })
// //         .then(response => {
// //           console.log('Response Data:', response.data);
// //           setQuestions(response.data.questionsResult);
// //         })
// //         .catch(err => {
// //           setError(err.response ? err.response.data.message : 'Error fetching questions');
// //         });
// //     } else {
// //       setError('No email found in local storage');
// //     }
// //   }, []);

// //   const handleAnswerChange = (index, value) => {
// //     setAnswers({ ...answers, [index]: value });
// //   };

// //   const handleSubmit = () => {
// //     console.log(answers);
// //     // You can add functionality here to handle form submission, such as sending answers to the backend
// //   };

// //   return (
// //     <div className="container">
// //       <h1>Fetched Questions</h1>
// //       {error && <p className="error-message">{error}</p>}
// //       {questions.length > 0 ? (
// //         <ul className="question-list">
// //           {questions.map((question, index) => (
// //             <li key={index} className="question-item">
// //               <strong>Q{index + 1}:</strong> {question.question}
// //               <textarea
// //                 placeholder="Write your answer here..."
// //                 value={answers[index] || ''}
// //                 onChange={(e) => handleAnswerChange(index, e.target.value)}
// //               />
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         !error && <p className="loading">Loading questions...</p>
// //       )}
// //       {questions.length > 0 && (
// //         <button className="submit-btn" onClick={handleSubmit}>
// //           Submit Answers
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default FetchQuestions;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FetchQuestions.css';  // Ensure that you link the CSS file properly
// import {useNavigate} from 'react-router-dom';

// const FetchQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   let history = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem('email');

//     if (email) {
//       axios.post('http://localhost:8800/fetch-question', { email })
//         .then(response => {
//           console.log('Response Data:', response.data);
//           setQuestions(response.data.questionsResult);

//           // Calculate countdown based on start_time and end_time
//           const startTime = new Date().getTime(); // Current time
//           const endTime = new Date().getTime() + 0.1 * 60 * 1000; // 5 minutes from now
//           const currentTime = new Date().getTime();
//           const initialTimeRemaining = endTime - currentTime;

//           // If the current time is before the end_time, initialize countdown
//           if (initialTimeRemaining > 0) {
//             setTimeRemaining(initialTimeRemaining);
//           } else {
//             setTimeRemaining(0); // Set to 0 if time is up
//           }
//         })
//         .catch(err => {
//           setError(err.response ? err.response.data.message : 'Error fetching questions');
//         });
//     } else {
//       setError('No email found in local storage');
//     }
//   }, []);

//   useEffect(() => {
//     if (timeRemaining > 0) {
//       const timerId = setInterval(() => {
//         setTimeRemaining(prevTime => prevTime - 1000);
//       }, 1000);

//       return () => clearInterval(timerId); // Cleanup the timer on component unmount
//     }
//   }, [timeRemaining]);

//   const handleAnswerChange = (index, value) => {
//     setAnswers({ ...answers, [index]: value });
//   };

//   const handleSubmit = () => {
//     const email = localStorage.getItem('email');
//   const examId = questions.length > 0 ? questions[0].examId : null; // Get examId from the questions array

//   if (!email || !examId) {
//     alert('Email or exam ID is missing!');
//     return;
//   }

//   const payload = {
//     email,
//     examId,
//     answers, // Answers already collected in state
//   };

//   axios
//     .post('http://localhost:8800/submit-answers', payload)
//     .then((response) => {
//       alert(response.data); // Success message
//       history('/examEnded');
//     })
//     .catch((error) => {
//       console.error('Error submitting answers:', error);
//       alert('An error occurred while submitting answers');
//     });
//     console.log(answers);
//     history('/examEnded')
//     // You can add functionality here to handle form submission, such as sending answers to the backend
//   };

//   const formatTime = (timeInMs) => {
//     const totalSeconds = Math.floor(timeInMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="container">
//       <h1>Fetched Questions</h1>

//       {/* Display Countdown Timer */}
//       {timeRemaining !== null && timeRemaining > 0 ? (
//         <div className="countdown-timer">
//           <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
//         </div>
//       ) : (
        
//           history('/examEnded')
        
//       )}

//       {error && <p className="error-message">{error}</p>}
//       {questions.length > 0 ? (
//         <ul className="question-list">
//           {questions.map((question, index) => (
//             <li key={index} className="question-item">
//               <strong>Q{index + 1}:</strong> {question.question}
//               <textarea
//                 placeholder="Write your answer here..."
//                 value={answers[index] || ''}
//                 onChange={(e) => handleAnswerChange(index, e.target.value)}
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p className="loading">Loading questions...</p>
//       )}
//       {questions.length > 0 && (
//         <button className="submit-btn" onClick={handleSubmit}>
//           Submit Answers
//         </button>
//       )}
//     </div>
//   );
// };

// export default FetchQuestions;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FetchQuestions.css';  // Ensure that you link the CSS file properly
// import { useNavigate } from 'react-router-dom';

// const FetchQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const navigate = useNavigate(); // Correct way to use navigation

//   useEffect(() => {
//     const email = localStorage.getItem('email');

//     if (email) {
//       axios.post('http://localhost:8800/fetch-question', { email })
//         .then(response => {
//           console.log('Response Data:', response.data);
//           setQuestions(response.data.questionsResult);

//           // Calculate countdown based on start_time and end_time
//           const startTime = new Date().getTime(); // Current time
//           const endTime = new Date().getTime() + 0.8 * 60 * 1000; // 5 minutes from now
//           const currentTime = new Date().getTime();
//           const initialTimeRemaining = endTime - currentTime;

//           // If the current time is before the end_time, initialize countdown
//           if (initialTimeRemaining > 0) {
//             setTimeRemaining(initialTimeRemaining);
//           } else {
//             setTimeRemaining(0); // Set to 0 if time is up
//           }
//         })
//         .catch(err => {
//           setError(err.response ? err.response.data.message : 'Error fetching questions');
//         });
//     } else {
//       setError('No email found in local storage');
//     }
//   }, []);

//   useEffect(() => {
//     if (timeRemaining > 0) {
//       const timerId = setInterval(() => {
//         setTimeRemaining(prevTime => prevTime - 1000);
//       }, 1000);

//       return () => clearInterval(timerId); // Cleanup the timer on component unmount
//     }
//   }, [timeRemaining]);

//   const handleAnswerChange = (qid, index, value) => {
//     // Include the question ID in the answers object
//     setAnswers({
//       ...answers,
//       [index]: { qid, ans: value },
//     });
//   };

//   const handleSubmit = () => {
//     const email = localStorage.getItem('email');
//     const examId = questions.length > 0 ? questions[0].examId : null; // Get examId from the questions array

//     if (!email || !examId) {
//       alert('Email or exam ID is missing!');
//       return;
//     }

//     // Convert answers object to an array of answers
//     const answersArray = Object.values(answers);

//     const payload = {
//       email,
//       examId,
//       answers: answersArray, // Send answers in the expected format
//     };

//     axios
//       .post('http://localhost:8800/store-answers', payload)
//       .then((response) => {
//         alert(response.data.message); // Success message
//         navigate('/examEnded'); // Use navigate instead of history
//       })
//       .catch((error) => {
//         console.error('Error submitting answers:', error);
//         alert('An error occurred while submitting answers');
//       });
//   };

//   const formatTime = (timeInMs) => {
//     const totalSeconds = Math.floor(timeInMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="container">
//       <h1>Fetched Questions</h1>

//       {/* Display Countdown Timer */}
//       {timeRemaining !== null && timeRemaining > 0 ? (
//         <div className="countdown-timer">
//           <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
//         </div>
//       ) : (
//         navigate('/examEnded') // Use navigate here as well
//       )}

//       {error && <p className="error-message">{error}</p>}
//       {questions.length > 0 ? (
//         <ul className="question-list">
//           {questions.map((question, index) => (
//             <li key={index} className="question-item">
//               <strong>Q{index + 1}:</strong> {question.question}
//               <textarea
//                 placeholder="Write your answer here..."
//                 value={answers[index]?.ans || ''} // Display answer if already typed
//                 onChange={(e) => handleAnswerChange(question.qid, index, e.target.value)} // Pass qid and value
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p className="loading">Loading questions...</p>
//       )}
//       {questions.length > 0 && (
//         <button className="submit-btn" onClick={handleSubmit}>
//           Submit Answers
//         </button>
//       )}
//     </div>
//   );
// };

// export default FetchQuestions;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FetchQuestions.css';  // Ensure that you link the CSS file properly
// import { useNavigate } from 'react-router-dom';

// const FetchQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const navigate = useNavigate(); // Correct way to use navigation

//   useEffect(() => {
//     const email = localStorage.getItem('email');

//     if (email) {
//       axios.post('http://localhost:8800/fetch-question', { email })
//         .then(response => {
//           console.log('Response Data:', response.data);
//           setQuestions(response.data.questionsResult);

//           // Calculate countdown based on start_time and end_time
//           const startTime = new Date().getTime(); // Current time
//           const endTime = new Date().getTime() + 0.1 * 60 * 1000; // 5 minutes from now
//           const currentTime = new Date().getTime();
//           const initialTimeRemaining = endTime - currentTime;

//           // If the current time is before the end_time, initialize countdown
//           if (initialTimeRemaining > 0) {
//             setTimeRemaining(initialTimeRemaining);
//           } else {
//             setTimeRemaining(0); // Set to 0 if time is up
//           }
//         })
//         .catch(err => {
//           setError(err.response ? err.response.data.message : 'Error fetching questions');
//         });
//     } else {
//       setError('No email found in local storage');
//     }
//   }, []);

//   useEffect(() => {
//     if (timeRemaining > 0) {
//       const timerId = setInterval(() => {
//         setTimeRemaining(prevTime => prevTime - 1000);
//       }, 1000);

//       return () => clearInterval(timerId); // Cleanup the timer on component unmount
//     } else if (timeRemaining === 0) {
//       // Automatically submit when time is up
//       handleSubmit();
//     }
//   }, [timeRemaining]);

//   const handleAnswerChange = (qid, index, value) => {
//     // Include the question ID in the answers object
//     setAnswers({
//       ...answers,
//       [qid]: { qid, ans: value || "" }
//     });
//   };

//   const handleSubmit = () => {
//     const email = localStorage.getItem('email');
//     const examId = questions.length > 0 ? questions[0].examId : null; // Get examId from the questions array

//     if (!email || !examId) {
//       alert('Email or exam ID is missing!');
//       return;
//     }

//     // Convert answers object to an array of answers
//     const answersArray = questions.map((question) => {
//       return {
//         qid: question.qid, 
//         ans: answers[question.qid] ? answers[question.qid].ans : "", // Set answer to "" if no answer provided
//       };
//     });

//     const payload = {
//       email,
//       examId,
//       answers: answersArray, // Send answers in the expected format
//     };

//     axios
//       .post('http://localhost:8800/store-answers', payload)
//       .then((response) => {
//         alert(response.data.message); // Success message
//         navigate('/examEnded'); // Use navigate instead of history
//       })
//       .catch((error) => {
//         console.error('Error submitting answers:', error);
//         alert('An error occurred while submitting answers');
//       });
//   };

//   const formatTime = (timeInMs) => {
//     const totalSeconds = Math.floor(timeInMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="container">
//       <h1>Fetched Questions</h1>

//       {/* Display Countdown Timer */}
//       {timeRemaining !== null && timeRemaining > 0 ? (
//         <div className="countdown-timer">
//           <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
//         </div>
//       ) : (
//         <div className="countdown-timer">
//           <strong>Time's Up!</strong>
//         </div>
//       )}

//       {error && <p className="error-message">{error}</p>}
//       {questions.length > 0 ? (
//         <ul className="question-list">
//           {questions.map((question, index) => (
//             <li key={index} className="question-item">
//               <strong>Q{index + 1}:</strong> {question.question}
//               <textarea
//                 placeholder="Write your answer here..."
//                 value={answers[index]?.ans || ''} // Display answer if already typed
//                 onChange={(e) => handleAnswerChange(question.qid, index, e.target.value)} // Pass qid and value
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p className="loading">Loading questions...</p>
//       )}
//       {questions.length > 0 && (
//         <button className="submit-btn" onClick={handleSubmit}>
//           Submit Answers
//         </button>
//       )}
//     </div>
//   );
// };

// export default FetchQuestions;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FetchQuestions.css';  // Ensure that you link the CSS file properly
// import { useNavigate } from 'react-router-dom';

// const FetchQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const navigate = useNavigate(); // Correct way to use navigation

//   useEffect(() => {
//     const email = localStorage.getItem('email');

//     if (email) {
//       axios.post('http://localhost:8800/fetch-question', { email })
//         .then(response => {
//           console.log('Response Data:', response.data);
//           setQuestions(response.data.questionsResult);

//           // Calculate countdown based on start_time and end_time
//           const startTime = new Date().getTime(); // Current time
//           const endTime = new Date().getTime() + 0.1 * 60 * 1000; // 5 minutes from now
//           const currentTime = new Date().getTime();
//           const initialTimeRemaining = endTime - currentTime;

//           // If the current time is before the end_time, initialize countdown
//           if (initialTimeRemaining > 0) {
//             setTimeRemaining(initialTimeRemaining);
//           } else {
//             setTimeRemaining(0); // Set to 0 if time is up
//           }
//         })
//         .catch(err => {
//           setError(err.response ? err.response.data.message : 'Error fetching questions');
//         });
//     } else {
//       setError('No email found in local storage');
//     }
//   }, []);

//   useEffect(() => {
//     if (timeRemaining > 0) {
//       const timerId = setInterval(() => {
//         setTimeRemaining(prevTime => prevTime - 1000);
//       }, 1000);

//       return () => clearInterval(timerId); // Cleanup the timer on component unmount
//     } else if (timeRemaining === 0) {
//       // Automatically submit when time is up
//       handleSubmit();
//     }
//   }, [timeRemaining]);

//   const handleAnswerChange = (qid, index, value) => {
//     // Ensure we set the answer even if it's empty
//     setAnswers({
//       ...answers,
//       [index]: { qid, ans: value || "" }, // Empty string if value is null
//     });
//   };

//   const handleSubmit = () => {
//     const email = localStorage.getItem('email');
//     const examId = questions.length > 0 ? questions[0].examId : null; // Get examId from the questions array
  
//     if (!email || !examId) {
//       alert('Email or exam ID is missing!');
//       return;
//     }
  
//     // Convert answers object to an array of answers, where each entry includes qid and ans
//     const answersArray = questions.map((question) => {
//       // Ensure each question gets its qid and answer (either answer or null if no answer)
//       const answer = answers[question.qid] ? answers[question.qid].ans : null; // Use null if no answer
//       return {
//         qid: question.qid, 
//         ans: answer, // Either the answer or null if not provided
//       };
//     });
  
//     const payload = {
//       email,
//       examId,
//       answers: answersArray, // Send answers in the expected format
//     };
  
//     axios
//       .post('http://localhost:8800/store-answers', payload)
//       .then((response) => {
//         alert(response.data.message); // Success message
//         navigate('/examEnded'); // Use navigate instead of history
//       })
//       .catch((error) => {
//         console.error('Error submitting answers:', error);
//         alert('An error occurred while submitting answers');
//       });
//   };
  

//   const formatTime = (timeInMs) => {
//     const totalSeconds = Math.floor(timeInMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="container">
//       <h1>Fetched Questions</h1>

//       {/* Display Countdown Timer */}
//       {timeRemaining !== null && timeRemaining > 0 ? (
//         <div className="countdown-timer">
//           <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
//         </div>
//       ) : (
//         <div className="countdown-timer">
//           <strong>Time's Up!</strong>
//         </div>
//       )}

//       {error && <p className="error-message">{error}</p>}
//       {questions.length > 0 ? (
//         <ul className="question-list">
//           {questions.map((question, index) => (
//             <li key={index} className="question-item">
//               <strong>Q{index + 1}:</strong> {question.question}
//               <textarea
//                 placeholder="Write your answer here..."
//                 value={answers[index]?.ans || ''} // Display answer if already typed, or empty string
//                 onChange={(e) => handleAnswerChange(question.qid, index, e.target.value)} // Pass qid and value
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p className="loading">Loading questions...</p>
//       )}
//       {questions.length > 0 && (
//         <button className="submit-btn" onClick={handleSubmit}>
//           Submit Answers
//         </button>
//       )}
//     </div>
//   );
// };

// export default FetchQuestions;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchQuestions.css';  // Ensure that you link the CSS file properly
import { useNavigate } from 'react-router-dom';

const FetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const navigate = useNavigate(); // Correct way to use navigation

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email) {
      axios.post('http://localhost:8800/fetch-question', { email })
        .then(response => {
          console.log('Response Data:', response.data);
          setQuestions(response.data.questionsResult);

          // Calculate countdown based on start_time and end_time
          const startTime = new Date().getTime(); // Current time
          const endTime = new Date().getTime() + 0.1 * 60 * 1000; // 5 minutes from now
          const currentTime = new Date().getTime();
          const initialTimeRemaining = endTime - currentTime;

          // If the current time is before the end_time, initialize countdown
          if (initialTimeRemaining > 0) {
            setTimeRemaining(initialTimeRemaining);
          } else {
            setTimeRemaining(0); // Set to 0 if time is up
          }
        })
        .catch(err => {
          setError(err.response ? err.response.data.message : 'Error fetching questions');
        });
    } else {
      setError('No email found in local storage');
    }
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1000);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the timer on component unmount
    } else if (timeRemaining === 0) {
      // Automatically submit when time is up
      handleSubmit();
    }
  }, [timeRemaining]);

  const handleAnswerChange = (qid, index, value) => {
    // Ensure we set the answer even if it's empty
    setAnswers({
      ...answers,
      [qid]: { qid, ans: value || "" }, // Empty string if value is null
    });
  };

  const handleSubmit = () => {
    const email = localStorage.getItem('email');
    const examId = questions.length > 0 ? questions[0].examId : null; // Get examId from the questions array
    
    if (!email || !examId) {
      alert('Email or exam ID is missing!');
      return;
    }

    // Convert answers object to an array of answers, where each entry includes qid and ans
    const answersArray = questions.map((question) => {
      // Ensure each question gets its qid and answer (either answer or "N/A" if no answer)
      const answer = answers[question.qid] && answers[question.qid].ans.trim().length > 0 
                    ? answers[question.qid].ans 
                    : "N/A"; // If no answer, use "N/A"
      return {
        qid: question.qid, 
        ans: answer, // Either the answer or "N/A" if not provided
      };
    });

    const payload = {
      email,
      examId,
      answers: answersArray, // Send answers in the expected format
    };

    axios
      .post('http://localhost:8800/store-answers', payload)
      .then((response) => {
        alert(response.data.message); // Success message
        navigate('/examEnded'); // Use navigate instead of history
      })
      .catch((error) => {
        console.error('Error submitting answers:', error);
        alert('An error occurred while submitting answers');
      });
  };

  const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Fetched Questions</h1>

      {/* Display Countdown Timer */}
      {timeRemaining !== null && timeRemaining > 0 ? (
        <div className="countdown-timer">
          <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
        </div>
      ) : (
        <div className="countdown-timer">
          <strong>Time's Up!</strong>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {questions.length > 0 ? (
        <ul className="question-list">
          {questions.map((question, index) => (
            <li key={index} className="question-item">
              <strong>Q{index + 1}:</strong> {question.question}
              <textarea
                placeholder="Write your answer here..."
                value={answers[question.qid]?.ans || ''} // Display answer if already typed, or empty string
                onChange={(e) => handleAnswerChange(question.qid, index, e.target.value)} // Pass qid and value
              />
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="loading">Loading questions...</p>
      )}
      {questions.length > 0 && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default FetchQuestions;

