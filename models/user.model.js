import db from "../config/database.js";

const findAll = async () => {
  const sql = "SELECT * FROM user";
  const [rows] = await db.query(sql);
  return rows;
};

const findById = async (id) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

const findByEmail = async (email) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.query(sql, [email]);
  return rows[0];
};

const create = async (firstname, lastname, email, hashedPassword) => {
  const sql =
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
  const [result] = await db.query(sql, [
    firstname,
    lastname,
    email,
    hashedPassword,
  ]);
  return result.insertId;
};

const update = async (id, user) => {
  const sql =
    "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?  WHERE id = ?";
  const [result] = await db.query(sql, [
    user.firstname,
    user.lastname,
    user.email,
    user.password,
    id,
  ]);
  return result;
};

const remove = async (id) => {
  const sql = "DELETE FROM user WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  return result;
};

export { findAll, findById, findByEmail, create, update, remove };
