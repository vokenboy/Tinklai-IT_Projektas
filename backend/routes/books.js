const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/getBooks', booksController.getBooks);
router.post('/addBook', booksController.addBook);

module.exports = router;
