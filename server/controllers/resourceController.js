const { Resource } = require('../models/resourceModel');
const resourceController = {};

resourceController.createResource = (req, res, next) => {
    const requestBody = req.body;

    Resource.create({
        link: requestBody.link,
        teamId: requestBody.teamId,
        category: requestBody.category
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

resourceController.listResources = (req, res, next) => {
    const requestBody = req.body;

    Resource.find({
        teamId: requestBody.teamId,
    })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.listResources:', 'resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listResources',
                    message: err
                }
            })
        });
}

resourceController.listThreeResources = (req, res, next) => {
    const requestBody = req.body;

    Resource.find({
        teamId: requestBody.teamId,
    }, null, { limit: 3 })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.listThreeResources:', '3 resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List 3 Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listThreeResources',
                    message: err
                }
            })
        });
}

resourceController.listAllResources = (req, res, next) => {
    Resource.find({})
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.listAllResources:', 'all resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List All Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listAllResources',
                    message: err
                }
            })
        });
}

resourceController.upvoteResource = (req, res, next) => {
    const requestBody = req.body;
    const numVotes = requestBody.upvote ? 1 : -1;

    Resource.findOneAndUpdate({
        // link: requestBody.link,
        // teamId: requestBody._id,
        _id: requestBody._id,
    }, {
        votes: requestBody.votes + numVotes,
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