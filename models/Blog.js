const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const BlogSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
