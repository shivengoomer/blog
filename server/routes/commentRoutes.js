const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postID: req.params.postId }).populate('userID');
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).send();
    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;