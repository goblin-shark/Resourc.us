const { User } = require('../model/userModel');
const userController = {};

userController.storeUser = (req, res, next) => {
	const requestBody = req.body;
	console.log('userController.storeUser:', 'reached controller');
	User.create({
		email: requestBody.email,
		hash: requestBody.hash
	})
		.then(data => {
			res.locals.response = data;
			console.log('userController.storeUser:', data);
			next();
		})
		.catch(err => {
			next({
				log: `storeUser - ERROR: ${err}`,
				message: { 
					err: 'Error occured in userController.storeUser',
					message: err
				}
			}) 
		});
}

module.exports = userController;