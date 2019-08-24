const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const sessions = require('client-sessions');

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
server.use(
  sessions({
    cookieName: 'cookieV2',
    secret: 'greatgooglymoogly!',
    duration: 24 * 60 * 60 * 1000,
    cookie: {
      maxAge: 60000,
      ephemeral: false,
      httpOnly: true,
      secure: false
    }
  })
);

server.use(function(req, res, next) {
  if (req.cookieV2.seenyou) {
    res.setHeader('X-Seen-You', 'true');
    next();
  } else {
    req.cookieV2.seenyou = true;
    res.setHeader('X-Seen-You', 'false');
    next();
  }
});
// server.use(session(sessionConfig));
server.use('/api', authRouter);

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} to ${req.path} at ${time.toISOString()}`);
  next();
}

module.exports = server;
