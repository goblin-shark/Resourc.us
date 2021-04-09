const { Team } = require('../models/teamsModel');
const teamController = {};

teamController.createTeam = (req, res, next) => {
    const requestBody = req.body;

    Team.create({
        image: requestBody.image,
        name: requestBody.name, // req.body.team.name
        category: requestBody.category,
        description: requestBody.description
    })
        .then(data => {
            res.locals.response = data;
            //console.log('teamController.createTeam:', 'team created')
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
            //console.log('teamController.listTeams:', 'list found')
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

teamController.findTeam = (req, res, next) => {
    Team.findOne({ "_id": req.params.id })
        .then(data => {
            res.locals.response = data;
            //console.log('teamController.listTeams:', 'team found')
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
            //console.log('teamController.listThreeTeams:', '3 list found: ', res.locals.response)
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