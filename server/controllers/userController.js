const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = (req, res, next) => {
	const requestBody = req.body;
	console.log('userController.createUser:', 'reached controller');
	User.create({
		email: requestBody.email,
		hash: requestBody.hash,
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
	User.findOne({ username: requestBody.username }).exec()
		.then(data => {
			bcrypt.compare(requestBody.hash, data.hash, function(err, result) {
				if (result === true) {
					console.log('userController.validateUser:', 'Password comparison is a match');
					next();
				} else {
					next({
						log: `validateUser - ERROR: Password doesn't match`,
						message: { 
							err: 'Error occured in userController.validateUser',
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