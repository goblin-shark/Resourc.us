const { User } = require('../models/userModel');
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

module.exports = userController;