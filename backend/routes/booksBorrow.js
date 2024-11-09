const express = require('express');
const router = express.Router();
const booksBorrowController = require('../controllers/booksBorrowController');

router.post('/borrow', booksBorrowController.borrowBook);
router.get('/getBorrowDates', booksBorrowController.getBorrowDates);

module.exports = router;
