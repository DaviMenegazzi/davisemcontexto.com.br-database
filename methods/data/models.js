const mongoose = require("mongoose");

const serverURL = "mongodb://127.0.0.1:27017/public";

const connect = async () => {
  await mongoose.connect(serverURL);
};

const postSchema = new mongoose.Schema(
{
  title: { type: String, required: true}, 
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  upvotes: { type: Number, default: 0, min: 0 },
  downvotes: { type: Number, default: 0, min: 0 },
  slug: { type: String, unique: true}
});
const Post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema(
{
  name: { type: String, unique: true },
  pass: { type: String, unique: true }
});
const User = mongoose.model("User", userSchema);

module.exports = {
  Post: Post,
  User: User,
  connect: connect,
};
