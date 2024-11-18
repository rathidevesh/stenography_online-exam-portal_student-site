import mysql from "mysql2"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'we-shine',
})

db.connect((err) => {
    if (err) {
        console.warn(err);
    }
    else {
        console.warn("Connected");
    }
})

export default db;
