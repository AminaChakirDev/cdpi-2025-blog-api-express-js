const Like = require("../models/like.model");

const createLike = (req, res) => {
  const body = req.body;

  Like.create(body, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    res.status(201).json({ id: results.insertId, name });
  });
};

const deleteLike = (req, res) => {
  const body = req.body;

  Like.remove(body, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.status(204).send();
  });
};

module.exports = {
  createLike,
  deleteLike,
};
