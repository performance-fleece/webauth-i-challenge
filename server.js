const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const authRouter = require('./authentication/authRouter');

const server = express();
const sessionConfig = {
  name: 'webauth',
  secret: 'super duper secret secret',
  cookie: {
    maxAge: 1000 * 600,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false //GDPR laws against setting cookies automatically
};

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', authRouter);

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} to ${req.path} at ${time.toISOString()}`);
  next();
}

module.exports = server;
