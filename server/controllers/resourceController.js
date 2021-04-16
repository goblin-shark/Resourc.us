const { Resource } = require('../models/resourceModel');
const urlMetadata = require('url-metadata');
const resourceController = {};

resourceController.createResource = (req, res, next) => {
  const requestBody = req.body;
  Resource.create({
    link: requestBody.link,
    teamId: requestBody.teamId,
    image: requestBody.image,
    title: requestBody.title,
    description: requestBody.description,
    category: requestBody.category,
    tags: requestBody.tags
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

resourceController.findOne = (req, res, next) => {
  const requestBody = req.body;

  Resource.findOne({
    _id: requestBody._id,
  })
    .then(data => {
      res.locals.response = data;
      console.log('resourceController.findOne:', 'findOne found')
      next();
    })
    .catch(err => {
      next({
        log: `findOne - ERROR: ${err}`,
        message: {
          err: 'Error occured in resourceController.findOne',
          message: err
        }
      })
    });
}

resourceController.updateUserUpvoteList = (req, res, next) => {
  const requestBody = req.body;
  const numVotes = requestBody.upvote ? 1 : -1;

  console.log('res.locals.response', res.locals.response);
  console.log('user._id: ', requestBody.user.user._id);

  // Don't allow the user to upvote if they have already upvoted
  if (numVotes === 1 && (res.locals.response.userUpvoteList.includes(requestBody.user.user._id) || requestBody.user.user._id === undefined)) {
    //console.log("User Already upvoted this resource")
    next();
    return;
  }

  // Don't allow the user to downvote if they have already downvoted (un-upvoted)
  if (numVotes === -1 && (!res.locals.response.userUpvoteList.includes(requestBody.user.user._id) || requestBody.user.user._id === undefined)) {
    //console.log("User Already downvoted this resource")
    next();
    return;
  }

  let newUserUpvoteList = res.locals.response.userUpvoteList;
  if (numVotes === 1) {
    newUserUpvoteList.push(requestBody.user.user._id)
  }
  else {
    newUserUpvoteList = newUserUpvoteList.filter((el) => requestBody.user.user._id != el)
  }

  Resource.findOneAndUpdate({
    _id: requestBody._id,
  }, {
    userUpvoteList: newUserUpvoteList,
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

resourceController.urlScraper = (req, res, next) => {
  const requestBody = req.body;

  urlMetadata(requestBody.link).then(
    function (metadata) {
      //success handler
      res.locals.response = metadata;
      next();
    },
    function (error) {
      //failure handler
      next({
        log: `urlScraper Resource - ERROR: ${error}`,
        message: {
          err: 'Error occured in resourceController.urlScraper',
          message: error
        }
      })
    })
}

module.exports = resourceController;