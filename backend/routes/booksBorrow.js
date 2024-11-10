const express = require('express');
const router = express.Router();
const booksBorrowController = require('../controllers/booksBorrowController');

router.post('/borrow', booksBorrowController.borrowBook);
router.get('/getBorrowDates', booksBorrowController.getBorrowDates);
router.get('/getBorrowedBooks', booksBorrowController.getBorrowedBooks);
router.delete('/deleteBorrowedBook/:id', booksBorrowController.deleteBorrowedBook);

module.exports = router;
