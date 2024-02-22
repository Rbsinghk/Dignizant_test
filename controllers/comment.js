const commentSchema = require('../models/blogComment');
const blogSchema = require('../models/blog');

const commentCreate = async (req, res) => {
  try {
    const blogIdCheck = await blogSchema.findOne({ _id: req.body.blogId });
    if (!blogIdCheck) {
      res.send({ message: "Blog Id not Valid", isSuccess: false });
    } else {
      const newblog = new commentSchema({
        content: req.body.content,
        userId: req.user.id,
        blogId: req.body.blogId,
      });
      newblog.save()
        .then(() => res.status(201).json({ message: "Comment Added Successfully", isSuccess: true }))
        .catch((error) => {
          res.send({ error, isSuccess: false });
        });
    }
  } catch (error) {
    res.json({ message: error.message, isSuccess: false });
  }
};

const getAllComment = async (req, res) => {
  try {
    const { page = 1 } = req.body;
    var perPage = req.body.perPage ? req.body.perPage : 25
    const data = await commentSchema
      .find({ blogId: req.body.blogId })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ '_id': -1 })
    const count = await commentSchema.find({ blogId: req.body.blogId }).count()
    res.status(201).send({
      message: "List of blogs",
      data,
      current: page,
      totalCount: count,
      pages: Math.ceil(count / perPage),
      isSuccess: true
    });
  } catch (error) {
    res.send({ error: error.message, isSuccess: false });
  }
}

module.exports = {
  commentCreate,
  getAllComment
}
