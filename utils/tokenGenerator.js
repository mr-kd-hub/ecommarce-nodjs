const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../.env" });
//generatoes token for mange state of user
module.exports.tokenGenerator = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1 days",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};
