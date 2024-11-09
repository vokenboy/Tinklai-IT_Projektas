const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/getLibrarians', usersController.getLibrarians);
router.post('/addLibrarian', usersController.addLibrarian);

module.exports = router;
