const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = (req, res, next) => {
  const requestBody = req.body;
  console.log('userController.createUser:', 'reached controller');
  User.create({
    email: requestBody.email,
    hash: requestBody.password,
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
  })
    .then(data => {
      res.locals.response = data;
      console.log('userController.createUser:', data);
      next();
    })
    .catch(err => {
      next({
        log: `createUser - ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.createUser',
          message: err
        }
      })
    });
}

userController.validateUser = (req, res, next) => {
  const requestBody = req.body;
  console.log('userController.validateUser:', 'reached controller');

  console.log('userController.validateUser: REQ ', req);
  User.findOne({ email: requestBody.email }).exec()
    .then(data => {
      bcrypt.compare(requestBody.password, data.hash, function (err, result) {
        if (result === true) {
          console.log('userController.validateUser:', 'Password comparison is a match');
          console.log('userController.validateUser USER ID:', data._id);
          res.locals.user_id = data._id;
          res.locals.user = data;
          next();
        } else {
          console.log('userController.validateUser:', 'Password doesnt match');
          next({
            log: `validateUser - ERROR: Password doesn't match`,
            message: {
              err: 'Error occured in userController.bcrypt',
              message: 'Password does not match'
            }
          })
        }
      })

    })
    .catch(err => {
      next({
        log: `validateUser - ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.validateUser',
          message: err
        }
      })
    });
}

module.exports = userController;