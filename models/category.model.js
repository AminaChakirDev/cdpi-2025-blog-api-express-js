const db = require("../config/database");

const findAll = (callback) => {
  const sql = "SELECT * FROM category";
  db.query(sql, callback);
};

const findById = (id, callback) => {
  const sql = "SELECT * FROM category WHERE id = ?";
  db.query(sql, [id], callback);
};

const create = (name, callback) => {
  const sql = "INSERT INTO category (name) VALUES (?)";
  db.query(sql, [name], callback);
};

const update = (id, name, callback) => {
  const sql = "UPDATE category SET name = ? WHERE id = ?";
  db.query(sql, [name, id], callback);
};

const remove = (id, callback) => {
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
