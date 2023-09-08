var jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const privateKeyPath = path.resolve(__dirname + "/private/private.key");

const login = (request) => {
  var expireTime = 60 * 60; // Uma hora para o token expirar.
  var privateKey = fs.readFileSync(privateKeyPath);
  var token = jwt.sign(
    {
      data: request.query,
    },
    privateKey,
    { expiresIn: expireTime, algorithm: "RS256" }
  );
  return token;
};

module.exports = login;
