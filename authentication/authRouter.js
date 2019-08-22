const express = require('express');

const router = express.Router();

const Auth = require('./authDb.js');

const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newuser = await Auth.register(user);
    res.status(201).json(newuser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.get('/users', async (req, res) => {
  const users = await Auth.find();
  res.status(200).json(users);
});

module.exports = router;
