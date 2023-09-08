const mongoose = require("mongoose");

const serverURL = "mongodb://127.0.0.1:27017/public";

const connect = async () => {
  await mongoose.connect(serverURL);
};

const PostModel = mongoose.model("Post", {
  title: String,
  content: String,
  timestamp: String,
  upvotes: Number,
  downvotes: Number,
  slug: String,
});

const UserModel = mongoose.model("User", {
  name: String,
  pass: String,
});

module.exports = {
  PostModel: PostModel,
  UserModel: UserModel,
  connect: connect,
};
