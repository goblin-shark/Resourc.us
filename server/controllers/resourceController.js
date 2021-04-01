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

resourceController.upvoteResource = (req, res, next) => {
    const requestBody = req.body;

    Resource.findOneAndUpdate({
        link: requestBody.link,
        teamId: requestBody.teamId,
    }, {
        votes: requestBody.votes + 1,
    },
        {
            returnNewDocument: true
        })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.upvoteResource:', 'resource upvoted')
            next();
        })
        .catch(err => {
            next({
                log: `Upvote Resource - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.upvoteResource',
                    message: err
                }
            })
        });
}

module.exports = resourceController;