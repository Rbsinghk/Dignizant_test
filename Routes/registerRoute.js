const express = require('express');
const router = new express.Router();
const registerController = require('../controllers/register');
const valid = require("../middleware/validator");

router.post('/register', valid.registerSchema, registerController.register);
router.post('/login', valid.loginSchema, registerController.login);

module.exports = router;
