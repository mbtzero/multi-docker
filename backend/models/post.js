const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  visible: String,
  pts1title: String,
  pts1points: String,
  pts2title: String,
  pts2points: String,
  pts3title: String,
  pts3points: String,

  // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Post', postSchema);

