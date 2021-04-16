const { Team } = require('../models/teamsModel');
const teamController = {};

teamController.createTeam = (req, res, next) => {
  const requestBody = req.body;

  Team.create({
    image: requestBody.image,
    name: requestBody.name,
    category: requestBody.category,
    description: requestBody.description
  })
    .then(data => {
      res.locals.response = data;
      console.log('teamController.createTeam:', 'team created')
      next();
    })
    .catch(err => {
      next({
        log: `Create Team - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.createTeam',
          message: err
        }
      })
    });
}

teamController.listTeams = (req, res, next) => {
  Team.find({})
    .then(data => {
      res.locals.response = data;
      console.log('teamController.listTeams:', 'list found')
      next();
    })
    .catch(err => {
      next({
        log: `List Teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.createTeam',
          message: err
        }
      })
    });
}

teamController.updateResourceCount = (req, res, next) => {
  Team.findOneAndUpdate({ _id: res.locals.response._id },
    {
      resourceCount: res.locals.team.resourceCount + 1,
    })
    .then(data => {
      res.locals.response = data;
      console.log('teamController.listTeams:', 'team found')
      next();
    })
    .catch(err => {
      next({
        log: `List Teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.findTeam',
          message: err
        }
      })
    });
}

teamController.addUserToTeam = (req, res, next) => {
  if (res.locals.response.userList.includes(req.body.user._id) || req.body.user._id === undefined) {
    console.log("User already in this team")
    next({
      log: `List Teams - ERROR: ${err}`,
      message: {
        err: 'Error occured in teamController.findTeam',
        message: err
      }
    })
  }

  const newUserList = res.locals.response.userList
  newUserList.push(req.body.user._id);
  Team.findOneAndUpdate({ _id: res.locals.response._id },
    {
      userList: newUserList,
    })
    .then(data => {
      res.locals.response = data;
      console.log('teamController.listTeams:', 'team found')
      next();
    })
    .catch(err => {
      next({
        log: `List Teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.findTeam',
          message: err
        }
      })
    });
}

teamController.findTeam = (req, res, next) => {
  Team.findOne({ _id: req.body.teamId })
    .then(data => {
      res.locals.response = data;
      res.locals.team = data;
      console.log('teamController.listTeams:', 'team found: ', res.locals.response)
      next();
    })
    .catch(err => {
      next({
        log: `List Teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.findTeam',
          message: err
        }
      })
    });
}

teamController.listThreeTeams = (req, res, next) => {
  Team.find({}, null, { limit: 3 })
    .then(data => {
      res.locals.response = data;
      console.log('teamController.listThreeTeams:', '3 list found: ', res.locals.response)
      next();
    })
    .catch(err => {
      next({
        log: `List 3 Teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.listThreeTeams',
          message: err
        }
      })
    });
}

module.exports = teamController;