import express from "express"
import db from "./config.js"
import cors from "cors"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { fileURLToPath } from 'url';
const app = express()
// const multer = require('multer')
const path = require('path')
// const csv = require('fast-csv')
const fs = require('fs')
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("hello this is the backend!!!")
})

app.post("/registeruser1",(req , res)=>{
    const {email,password} = req.body;
    const sql = 'INSERT INTO candidate_register_login (email , password) VALUES (? , ?)';
    db.query(sql , [email,password],(err , result)=>{
        if(err){
            console.log('error executing sql' + err.stack);
            res.status(500).json({error : 'Internal server error'});
            return;
        }
        res.status(201).json({message:'User Registered Successfully'});
    })

})


app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM candidate_register_login WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
      } else {
        if (result.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Login failed. Invalid username or password.' });
        }
      }
    });
  });

  app.get("/candidate/:email", (req, res) => {
    const { email } = req.params;

    // SQL query to retrieve all information for the candidate with the given email
    const sql = "SELECT * FROM candidate WHERE email = ?";

    // Execute the query
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ message: "No candidate found with this email" });
        } else {
            res.status(200).json(result);
        }
    });
});

// app.post('/fetch-question' , async(req , res) => {
//   const {email} = req.body;

//   try{
//     const sqlCandidate = 'SELECT examId FROM candidate WHERE email = ?';
//     db.query(sqlCandidate , [email] , (err , candidateRsult) => {
//       if(err){
//         console.log("Error excuting sql :" + err.stack);
//         res.status(500).json({error : 'Internal server error'});
//         return;
//       }
//       console.log(candidateRsult.length)
//       if(candidateRsult.length === 0){
//         res.status(404).json({ message: 'Candidate not found.' });
//         return;
//       }

//       const examId = candidateRsult[0].examId;
//       const tableNameGeneratedExam = `generated_exam_${examId}`;
//       const sqlColumns = `SHOW COLUMNS FROM ${tableNameGeneratedExam}`;
//       const tableNameQuestions = `questions_for_examid_${examId}`;

//       db.query(sqlColumns, (err, columnsResult) => {
//         if (err) {
//             console.log('Error executing SQL: ' + err.stack);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
    
//         // Extract column names that start with 'q' (assuming they represent question IDs)
//         const questionColumns = columnsResult
//             .map(column => column.Field)
//             .filter(fieldName => fieldName.startsWith('q'));
    
//         if (questionColumns.length === 0) {
//             res.status(404).json({ message: 'No question columns found in the generated exam table.' });
//             return;
//         }
    
//         // Step 3: Build the SQL query to select only these columns
//         const sqlGeneratedExam = `SELECT ${questionColumns.join(', ')} , FROM ${tableNameGeneratedExam} WHERE email_id = ?`;
        
    
//         db.query(sqlGeneratedExam, [email], (err, generatedExamResult) => {
//             if (err) {
//                 console.log('Error executing SQL: ' + err.stack);
//                 res.status(500).json({ error: 'Internal server error' });
//                 return;
//             }
    
//             if (generatedExamResult.length === 0) {
//                 res.status(404).json({ message: 'No questions found for the given candidate.' });
//                 return;
//             }
    
//             // Handle the result here...
//             // res.json(generatedExamResult);

//             const questionIds = Object.values(generatedExamResult[0]);
            
//             const sqlQuestions = `
//             SELECT * 
//             FROM ${tableNameQuestions} 
//             WHERE qid IN (${questionIds.map(() => '?').join(', ')})
//             ORDER BY FIELD(qid, ${questionIds.join(', ')})
//         `;

//         db.query(sqlQuestions, questionIds, (err, questionsResult) => {
//           if (err) {
//               console.log('Error executing SQL: ' + err.stack);
//               res.status(500).json({ error: 'Internal server error' });
//               return;
//           }

//           res.json(questionsResult);
//       });

//         });
//     });
//     })
//   }
//   catch (error) {
//     console.log('Unexpected error: ' + error.stack);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })


app.post('/fetch-question', async (req, res) => {
  const { email } = req.body;

  try {
    const sqlCandidate = 'SELECT examId FROM candidate WHERE email = ?';
    db.query(sqlCandidate, [email], (err, candidateResult) => {
      if (err) {
        console.log("Error executing SQL (Candidate Query): " + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (candidateResult.length === 0) {
        res.status(404).json({ message: 'Candidate not found.' });
        return;
      }

      const examId = candidateResult[0].examId;
      const tableNameGeneratedExam = `generated_exam_${examId}`;
      const sqlColumns = `SHOW COLUMNS FROM ${tableNameGeneratedExam}`;
      const tableNameQuestions = `questions_for_examid_${examId}`;

      db.query(sqlColumns, (err, columnsResult) => {
        if (err) {
          console.log('Error executing SQL (Columns Query): ' + err.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        // Extract column names that start with 'q' (assuming they represent question IDs)
        const questionColumns = columnsResult
          .map(column => column.Field)
          .filter(fieldName => fieldName.startsWith('q'));

        if (questionColumns.length === 0) {
          res.status(404).json({ message: 'No question columns found in the generated exam table.' });
          return;
        }

        // Make sure start_time and end_time columns are also present
        if (!columnsResult.some(column => column.Field === 'start_time') || !columnsResult.some(column => column.Field === 'end_time')) {
          res.status(500).json({ message: 'start_time or end_time column not found in the table.' });
          return;
        }

        // Build the SQL query to select question columns along with start_time and end_time
        const sqlGeneratedExam = `
          SELECT ${questionColumns.join(', ')}, start_time, end_time 
          FROM ${tableNameGeneratedExam} 
          WHERE email_id = ?
        `;

        db.query(sqlGeneratedExam, [email], (err, generatedExamResult) => {
          if (err) {
            console.log('Error executing SQL (Generated Exam Query): ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          if (generatedExamResult.length === 0) {
            res.status(404).json({ message: 'No questions found for the given candidate.' });
            return;
          }

          const { start_time, end_time } = generatedExamResult[0];  // Extract start_time and end_time
          const questionIds = Object.values(generatedExamResult[0]).slice(0, questionColumns.length);

          const sqlQuestions = `
            SELECT * 
            FROM ${tableNameQuestions} 
            WHERE qid IN (${questionIds.map(() => '?').join(', ')})
            ORDER BY FIELD(qid, ${questionIds.join(', ')})
          `;

          db.query(sqlQuestions, questionIds, (err, questionsResult) => {
            if (err) {
              console.log('Error executing SQL (Questions Query): ' + err.stack);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

            // Send both the questions and the exam's start_time and end_time
            res.json({ questionsResult, start_time, end_time });
          });
        });
      });
    });
  } catch (error) {
    console.log('Unexpected error: ' + error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.post('/fetch-questions', async (req, res) => {
//   const { email } = req.body;

//   try {
//       // Step 1: Check if the email exists in the Candidate table and fetch the examid
//       const sqlCandidate = 'SELECT examId FROM candidate WHERE email = ?';
//       db.query(sqlCandidate, [email], (err, candidateResult) => {
//           if (err) {
//               console.log('Error executing SQL: ' + err.stack);
//               res.status(500).json({ error: 'Internal server error' });
//               return;
//           }

//           if (candidateResult.length === 0) {
//               res.status(404).json({ message: 'Candidate not found.' });
//               return;
//           }

//           const examid = candidateResult[0].examId;

//           // Step 2: Dynamically fetch the column names (question IDs) from the generated_exam_${examid} table
//           const tableNameGeneratedExam = `generated_exam_${examid}`;
//           const sqlColumns = `SHOW COLUMNS FROM ${tableNameGeneratedExam}`;

//           db.query(sqlColumns, (err, columnsResult) => {
//               if (err) {
//                   console.log('Error executing SQL: ' + err.stack);
//                   res.status(500).json({ error: 'Internal server error' });
//                   return;
//               }

//               // Extract column names that start with 'q' (assuming they represent question IDs)
//               const questionColumns = columnsResult
//                   .map(column => column.Field)
//                   .filter(fieldName => fieldName.startsWith('q'));

//               if (questionColumns.length === 0) {
//                   res.status(404).json({ message: 'No question columns found in the generated exam table.' });
//                   return;
//               }

//               // Build a dynamic SQL query to select these columns
//               const sqlGeneratedExam = `SELECT ${questionColumns.join(', ')} FROM ${tableNameGeneratedExam} WHERE email_id = ?`;
              
//               db.query(sqlGeneratedExam, [email], (err, generatedExamResult) => {
//                   if (err) {
//                       console.log('Error executing SQL: ' + err.stack);
//                       res.status(500).json({ error: 'Internal server error' });
//                       return;
//                   }

//                   if (generatedExamResult.length === 0) {
//                       res.status(404).json({ message: 'No questions found for the given candidate.' });
//                       return;
//                   }

//                   // Extract question IDs from the result
//                   const questionIds = Object.values(generatedExamResult[0]);

//                   // Step 3: Fetch questions from the questions_for_${examid} table
//                   const tableNameQuestions = `questions_for_examid_${examid}`;
//                   const placeholders = questionIds.map(() => '?').join(',');
                  
//                   const sqlQuestions = `SELECT * FROM ${tableNameQuestions} WHERE qid IN (${placeholders})`;

//                   db.query(sqlQuestions, questionIds, (err, questionResults) => {
//                       if (err) {
//                           console.log('Error executing SQL: ' + err.stack);
//                           res.status(500).json({ error: 'Internal server error' });
//                           return;
//                       }

//                       if (questionResults.length === 0) {
//                           res.status(404).json({ message: 'No questions found for the given exam ID.' });
//                           return;
//                       }

//                       // Return the questions to the client
//                       res.json(questionResults);
//                   });
//               });
//           });
//       });
//   } catch (error) {
//       console.log('Unexpected error: ' + error.stack);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/store-answers', async (req, res) => {
  const { examId, email, answers } = req.body;

  // `answers` is expected to be an array of objects: [{ qid: 1, ans: "Answer1" }, { qid: 2, ans: "Answer2" }, ...]
  const questionCount = answers.length;

  if (!examId || !email || questionCount === 0) {
    res.status(400).json({ error: 'Invalid input. Please provide examId, email, and answers.' });
    return;
  }

  // Generate the table name
  const tableName = `answers_for_examid_${examId}`;

  // Generate column definitions
  let columns = `email VARCHAR(255) NOT NULL`;
  for (let i = 1; i <= questionCount; i++) {
    columns += `, q${i} INT, a${i} TEXT`;
  }

  // SQL to create the table
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ${columns}
    )
  `;

  // Create the table if it doesn't exist
  db.query(createTableSQL, (err, result) => {
    if (err) {
      console.error(`Error creating table ${tableName}:`, err);
      res.status(500).json({ error: 'Internal server error while creating table.' });
      return;
    }

    // Prepare the data to insert
    const questionColumns = [];
    const answerValues = [];
    answers.forEach((item, index) => {
      questionColumns.push(`q${index + 1}`, `a${index + 1}`);
      answerValues.push(item.qid, item.ans);
    });

    // Insert query
    const insertSQL = `
      INSERT INTO ${tableName} (email, ${questionColumns.join(', ')})
      VALUES (?, ${answerValues.map(() => '?').join(', ')})
    `;

    db.query(insertSQL, [email, ...answerValues], (err, result) => {
      if (err) {
        console.error(`Error inserting answers into table ${tableName}:`, err);
        res.status(500).json({ error: 'Internal server error while storing answers.' });
        return;
      }

      res.status(200).json({ message: 'Answers stored successfully!' });
    });
  });
});




app.listen(8800,()=>{
    console.log("server is running on port 8800 ")
})

