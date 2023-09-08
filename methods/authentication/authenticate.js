var jwt = require("jsonwebtoken");
const fs = require("fs");
var path = require("path");

const publicKeyPath = path.resolve(__dirname + "/private/public.pem");

const authenticate = (request) => {
  var response = { code: false, error: "AuthenticationError" };
  var publicKey = fs.readFileSync(publicKeyPath);
  var token = jwt.verify(
    request.query.token,
    publicKey,
    function (err, decoded) {
      if (err) {
        response = { code: false, error: err.name };
      } else {
        // utiliza os dados recebidos pelo token decodificado usando o decoded
        response = { code: true, auth: "ok" };
      }
    }
  );
  return response;
};

module.exports = authenticate;
