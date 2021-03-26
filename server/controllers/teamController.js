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
                log: `verifyEmail - ERROR: ${err}`,
                message: {
                    err: 'Error occured in teamController.createTeam',
                    message: err
                }
            })
        });
}

teamController.listTeams = (req, res, next) => {
    next();
}

module.exports = teamController;