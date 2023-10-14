const express = require("express");
const cors = require("cors");

const login = require("./methods/authentication/login.js");
const authenticate = require("./methods/authentication/authenticate.js");
const models = require("./methods/data/models.js");
const related = require("./methods/data/related.js");

const app = express();

/**
 * Aplicativo básico de uma Restful API
 * com comandos CRUD para o davisemcontexto.com.br.
 */

const ENDPOINTS = {
  create: "/create",
  get: "/get",
  get_only: "/get_only",
  login: "/login",
  auth: "/auth",
  update_rating: "/update_rating",
};

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3000, async function () {
  // conecta ao servidor mongo.
  models.connect();
  console.log("MongoDB RESTful API running.")
});

app.post(ENDPOINTS.create, async (req, res) => {
  console.log("performing /create api route");
  let code = related.createPost(req);
  res.send({ code: code });
});

app.get(ENDPOINTS.get, async (req, res) => {
  console.log("performing /get api route");
  let getPostDataPromise = related.getPost().then((postDataList) => {
    if (postDataList != null) {
      //console.log(postDataList);
      res.send(postDataList);
    }
  });
});

app.get(ENDPOINTS.get_only, async (req, res) => {
  console.log("performing /get_only api route");
  let postDataPromise = related.getOnlyPost(req).then((postData) => {
    if (postData != null) {
      res.send(postData);
    }
  });
});

app.get(ENDPOINTS.login, async (req, res) => {
  console.log("performing /login api route");
  let token = login(req);
  res.send({ code: true, token: token });
});

app.post(ENDPOINTS.auth, async (req, res) => {
  console.log("performing /auth api route");
  let response = authenticate(req);
  res.send(response);
});

app.post(ENDPOINTS.update_rating, async (req, res) => {
  console.log("performing /update_rating api route");
  let updatedPost = related.updateRating(req);
  res.send({ code: true, data: updatedPost });
});
