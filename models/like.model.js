const db = require("../config/database");

const create = (body, callback) => {
  const sql =
    "INSERT INTO article_user_like (user_id, article_id) VALUES (?, ?)";
  db.query(sql, [body.userId, body.articleId], callback);
};

const remove = (body, callback) => {
  const sql = "DELETE FROM user WHERE user_id = ? AND article_id = ?";
  db.query(sql, [body.userId, body.articleId], callback);
};

module.exports = {
  create,
  remove,
};
