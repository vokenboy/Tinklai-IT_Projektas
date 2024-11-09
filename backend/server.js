// server.js
const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookBorrowRoutes = require('./routes/booksBorrow');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/borrowedBooks', bookBorrowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
