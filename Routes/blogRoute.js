const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const blogController = require('../controllers/blog');
const upload = require("../middleware/multer");
const { blogSchema } = require("../middleware/validator");

router.post('/blogCreate', [auth, upload.single('file'), blogSchema], blogController.blogCreate);
router.post('/allblog', auth, blogController.getAllblog);
router.get("/blog", auth, blogController.blogById);
router.post("/blogUpdate", [auth, upload.single('file')], blogController.blogUpdate);
router.delete('/blogdelete', auth, blogController.blogDelete);

module.exports = router;
