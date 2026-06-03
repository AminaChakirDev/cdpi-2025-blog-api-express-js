import db from "../config/database.js";

const findAll = async () => {
  const sql = "SELECT * FROM category";
  const [rows] = await db.query(sql);
  return rows;
};

const findById = async (id) => {
  const sql = "SELECT * FROM category WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows[0] ?? null;
};

const create = async (name) => {
  const sql = "INSERT INTO category (name) VALUES (?)";
  const [result] = await db.query(sql, [name]);
  return result.insertId;
};

const update = async (id, name) => {
  const sql = "UPDATE category SET name = ? WHERE id = ?";
  const [result] = await db.query(sql, [name, id]);
  return result;
};

const remove = async (id) => {
  const sql = "DELETE FROM category WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  return result;
};

export { findAll, findById, create, update, remove };
