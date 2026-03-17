const db = require("../config/database");

const findAll = (callback) => {
  const sql = "SELECT * FROM article";
  db.query(sql, callback);
};

const findById = (id, callback) => {
  const sql = "SELECT * FROM article WHERE id = ?";
  db.query(sql, [id], callback);
};

const create = (article, callback) => {
  const sql =
    "INSERT INTO article (title, content, category_id) VALUES (?, ?, ?)";
  db.query(sql, [article.title, article.content, article.categoryId], callback);
};

const update = (id, article, callback) => {
  const sql = "UPDATE article SET title = ?, content = ?, category_id = ?  WHERE id = ?";
  db.query(sql, [article.title, article.content, article.categoryId, id], callback);
};

const remove = (id, callback) => {
  const sql = "DELETE FROM article WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
