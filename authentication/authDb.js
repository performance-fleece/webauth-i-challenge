const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findbyId,
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
      const [id] = ids;
      return findbyId(id);
    });
}
