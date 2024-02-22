const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const referenceByController = require('../controllers/comment');

router.post('/commentCreate', auth, referenceByController.commentCreate);
router.post('/getAllComment', auth, referenceByController.getAllComment);

module.exports = router;
