const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const authController = {};

authController.generateAccessToken = (req, res, next) => {
  //res.locals.token = jwt.sign(res.locals.user_id, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  console.log("Inside GAT. USER ID: ", res.locals.user_id)

  try {
    res.locals.token = jwt.sign({ userId: res.locals.user_id }, "09f26e402586e2faa8da4c98a35f1b20d6b033c60", {
      algorithm: "HS256",
      expiresIn: 1800
    });
  } catch (e) {
    console.log("Error: ", e)
    next(e)
  }

  console.log("Done generating access token: ", res.locals.token)
  next();
}

module.exports = authController;