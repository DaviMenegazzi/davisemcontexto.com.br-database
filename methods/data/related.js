const models = require("./models.js");
const {v4: uuidv4} = require("uuid");

/**
 * Cria um documento novo no banco de dados.
 * @param {*} request 
 */
const createPost = async (request) => {
  const newPost = new models.Post(request.query);
  newPost.slug = uuidv4().slice(0, 6); // adiciona um slug pro objeto
  await newPost.save()
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

/**
 * Retorna todos os posts armazenados no servidor.
 */
const getPost = async () => {
  const cursor = models.Post.find().cursor();
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
  let post = await models.Post.findOne(query).exec();

  const docArray = [];
  docArray.push(post);

  return docArray;
};

/**
 * Muda o valor dos upvotes ou downvotes
 * @param {*} request 
 * @returns Post object
 */
const updateRating = async (request) => {
  let post = await models.Post.findById(request.query._id).exec();

  let value_to_change = post.toJSON()[request.query.type] + 1;
  await post.updateOne( {[request.query.type]: value_to_change} ).catch(err => {
    console.log(err);
  });

  return post;
};

module.exports = {
  createPost: createPost,
  getPost: getPost,
  getOnlyPost: getOnlyPost,
  updateRating: updateRating,
};
