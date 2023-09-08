const models = require("./models.js");
const slugify = require("slugify");

const currentDate = new Date();

// NOTE: melhorar a forma como o código envia os dados para o servidor
// NOTE: melhorar os modelos de query
const createPost = async (request) => {
  let timestamp = currentDate.getTime();

  const newPost = new models.PostModel({
    title: request.query.title,
    content: request.query.content,
    timestamp: timestamp,
    upvotes: 0,
    downvotes: 0,
    slug: slugify(request.query.title),
  });

  await newPost
    .save()
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

/**
 * Retorna todos os posts armazenados no servidor.
 */
const getPost = async () => {
  const cursor = models.PostModel.find().cursor();
  var postList = [];
  try {
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      postList.push(doc);
    }
  } catch {
    return null;
  }
  return postList;
};

// faz o request para o servidor somente o valor que foi passado
// pelo query
const getOnlyPost = async (request) => {
  let key = request.query.key;
  let query = {};
  query[key] = request.query.value;
  let post = await models.PostModel.findOne(query).exec();

  const docArray = [];
  docArray.push(post);

  return docArray;
};

const updateRating = async (request) => {
  let type = request.query.type;
  let update = {};
  let post = await models.PostModel.findById(request.query._id).exec();

  console.log(type);

  update[type] = post[type] + 1;
  await post.updateOne(update);

  let updatedPost = await models.PostModel.findById(request.query._id).exec();

  return updatedPost;
};

module.exports = {
  createPost: createPost,
  getPost: getPost,
  getOnlyPost: getOnlyPost,
  updateRating: updateRating,
};
