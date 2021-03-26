const { Team } = require('../model/teamsModel');
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

module.exports = teamController;