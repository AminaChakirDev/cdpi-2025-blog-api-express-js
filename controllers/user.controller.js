const User = require("../models/user.model");

const getAllUsers = (req, res) => {
  User.findAll((error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.length === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.json(results[0]);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;

  User.update(id, user, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.json({ id: parseInt(id, 10), name });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  User.remove(id, (error, results) => {
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
