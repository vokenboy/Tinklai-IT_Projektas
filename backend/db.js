const mysql = require('mysql2');

const dbConfig = {
  host: 'mysql',
  user: 'stud',
  password: 'stud',
  database: 'database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};


// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'projektas',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// };

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
