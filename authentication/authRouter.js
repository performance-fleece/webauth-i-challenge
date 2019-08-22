const express = require('express');

const router = express.Router();

const Auth = require('./authDb.js');

const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newuser = await Auth.add(user);
    res.status(201).json(newuser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.get('/users', restricted, async (req, res) => {
  const users = await Auth.find();
  res.status(200).json(users);
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  try {
    Auth.findbyUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    Auth.findbyUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Unexpected Error' });
      });
  } else {
    res.status(400).json({ message: 'Please provide username and password' });
  }
}
module.exports = router;
