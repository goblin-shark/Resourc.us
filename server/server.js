const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const db = require('./models/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

dotenv.config();

const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const resourceRouter = require('./routes/resource');
const searchDatabase = require('./routes/search')

const PORT = 3000;

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}

// HANDLE ASSETS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions))


// ROUTES
app.use('/user', userRouter);
app.use('/teams', teamRouter);
app.use('/resource', resourceRouter);
app.use('/search', searchDatabase);

// Renders index.html with static assets
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', function (req, res) {
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
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});