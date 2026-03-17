const db = require("../config/database");

const findAll = (callback) => {
  const sql = "SELECT * FROM user";
  db.query(sql, callback);
};

const findById = (id, callback) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [id], callback);
};

const findByEmail = (email, callback) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], callback);
};

const create = (firstname,lastname, email, hashedPassword, callback) => {
  const sql =
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [firstname, lastname, email, hashedPassword], callback);
};

const update = (id, user, callback) => {
  const sql =
    "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?  WHERE id = ?";
  db.query(
    sql,
    [user.firstname, user.lastname, user.email, user.password, id],
    callback
  );
};

const remove = (id, callback) => {
  const sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
};
