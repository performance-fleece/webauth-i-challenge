const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findbyId,
  findbyUser,
  add
};

function find() {
  return db('users');
}

function findbyId(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return findbyId(ids[0]);
    });
}

function findbyUser(filter) {
  return db('users').where(filter);
}
