import pg from 'pg';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

let initialPath = path.join(__dirname, "..", "public");
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req,res) => {
    res.sendFile(path.join(initialPath,"index.html"));
})

app.get('/act1',(req,res) =>{
    res.sendFile(path.join(initialPath,"act1.html"));
})

app.get('/act2',(req,res) =>{
    res.sendFile(path.join(initialPath,"act2.html"));
})

app.get('/act3',(req,res) =>{
    res.sendFile(path.join(initialPath,"act3.html"));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(initialPath,"ilogin.html"));
})

app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialPath,"isignUp.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password, confPassword } = req.body;
  
    console.log(`there is register detected from ${email}`);
  
    if (!name.length || !email.length || !password.length || !confPassword.length) {
      res.json('tolong isi semua input');
    } else if (password !== confPassword) {
      res.json('password tidak sesuai');
    } else if (email.length < 7) {
      res.json('Masukkan username setidaknya 7 karakter');
    } else {
      pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email',
        [name, email, password]
      )
        .then(data => {
          res.json(data.rows[0]);
        })
        .catch(err => {
          if (err.detail.includes('already exists')) {
            res.json('username sudah digunakan');
          }
        });
    }
  });

  app.post('/login-user', (req, res) => {
    const { email, password } = req.body;
  
    console.log(`there is login detected from ${email}`);
  
    pool.query(
      'SELECT name, email, act1, act2, act3 FROM users WHERE email = $1 AND password = $2',
      [email, password]
    )
      .then(data => {
        console.log(data.rows);
  
        if (data.rows.length) {
          res.json(data.rows[0]);
        } else {
          res.json('email atau password yang dimasukkan salah');
        }
      })
      .catch(err => {
        console.error('Error querying database:', err);
        res.status(500).json('Terjadi kesalahan saat login');
      });
  });

  app.post('/completion-status-2', (req, res) => {
    const { email, page } = req.body;
    console.log(email);
    console.log(page);
  
    pool.query(
      'UPDATE users SET act2 = $2 WHERE email = $1',
      [email, page]
    )
      .then(() => {
        console.log('Update successful');
        res.json({ message: 'Update successful' });
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
      });
  });

app.post('/completion-status-3',(req,res) => {
    const {email, page} = req.body;
    console.log(email);
    console.log(page);

    pool.query(
        'UPDATE users SET act3 = $2 WHERE email = $1',
        [email, page]
      )
        .then(() => {
          console.log('Update successful');
          res.json({ message: 'Update successful' });
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          res.status(500).json({ message: 'Error updating user' });
        });
})

app.post('/completion-status-1',(req,res) => {
    const {email, page} = req.body;
    console.log(email);
    console.log(page);
    
    

    pool.query(
        'UPDATE users SET act1 = $2 WHERE email = $1',
        [email, page]
      )
        .then(() => {
          console.log('Update successful');
          res.json({ message: 'Update successful' });
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          res.status(500).json({ message: 'Error updating user' });
        });
})

module.exports = app;