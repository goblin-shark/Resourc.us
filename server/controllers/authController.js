const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const authController = {};

authController.generateAccessToken = (req, res, next) => {
  try {
    res.locals.token = jwt.sign({ userId: res.locals.user_id }, "09f26e402586e2faa8da4c98a35f1b20d6b033c60", {
      algorithm: "HS256",
      expiresIn: 1800
    });
  } catch (e) {
    next(e)
  }

  res.cookie("jwt", res.locals.token)
  next();
}

authController.authenticateToken = (req, res, next) => {
  try {
    jwt.verify(req.cookies.token.toString(), "09f26e402586e2faa8da4c98a35f1b20d6b033c60")
  } catch (e) {
    console.log("Error in Authenticate Token: ", e)
    next(e)
  }

  next()
}

module.exports = authController;