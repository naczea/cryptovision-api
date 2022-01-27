const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// MySql
const connection = mysql.createConnection({
  host: 'bubpuaypz3zhlrtc3emy-mysql.services.clever-cloud.com',
  user: 'u6kqskldskghamce',
  password: 'anz222FsDh1YUYvjjspX',
  database: 'bubpuaypz3zhlrtc3emy'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my ssAPI 2!');
});

// all customers
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO users SET ?';

  const customerObj = {
    username: req.body.username,
    email: req.body.email
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('User created!');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
