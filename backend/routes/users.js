const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/getLibrarians', usersController.getLibrarians);
router.post('/addLibrarian', usersController.addLibrarian);
router.get('/getUser/:id', usersController.getUserById);

module.exports = router;
