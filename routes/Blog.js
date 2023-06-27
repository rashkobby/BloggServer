const router = require('express').Router();
const Post = require('../models/Blog');

// Create post
router.post('/', async (req, res) => {
  try {
    const savePost = new Post(req.body);
    const savedPost = await savePost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post._id.toString() === req.params.id) {
        await Post.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json('The post has been updated');
      } else {
        res.status(403).json('You can only update your post');
      }
    } else {
      res.status(404).json('Post not found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post._id.toString() === req.params.id) {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json('The post has been deleted');
      } else {
        res.status(403).json('You can only delete your post');
      }
    } else {
      res.status(404).json('Post not found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json('Post not found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
