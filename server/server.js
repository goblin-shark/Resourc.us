const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/db');

const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const resourceRouter = require('./routes/resource');

const PORT = 3000;

// HANDLE ASSETS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/user', userRouter);
app.use('/teams', teamRouter);
app.use('/resource', resourceRouter);

// Renders index.html with static assets
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    // console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// RUN SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});