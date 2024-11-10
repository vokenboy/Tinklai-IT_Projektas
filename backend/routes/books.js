const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/getBooks', booksController.getBooks);
router.post('/addBook', booksController.addBook);
router.put('/editBook', booksController.editBook);
router.delete('/deleteBook/:id', booksController.deleteBook);

module.exports = router;
