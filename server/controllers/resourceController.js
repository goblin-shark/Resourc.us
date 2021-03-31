const { Resource } = require('../models/resourceModel');
const resourceController = {};

resourceController.createResource = (req, res, next) => {
    const requestBody = req.body;

    Resource.create({
        link: requestBody.link,
        teamId: requestBody.teamId,
    })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.createResource:', 'resource created')
            next();
        })
        .catch(err => {
            next({
                log: `Create Resource - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.createResource',
                    message: err
                }
            })
        });
}

module.exports = resourceController;