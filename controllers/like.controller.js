import * as Like from "../models/like.model.js";

const createLike = (req, res) => {
  const body = req.body;

  Like.create(body, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
    }

    res.status(201).json({ id: results.insertId, name });
  });
};

const deleteLike = (req, res) => {
  const body = req.body;

  Like.remove(body, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({message: "Catégorie non trouvée"});
    }

    res.status(204).send();
  });
};

export {
  createLike,
  deleteLike,
};
