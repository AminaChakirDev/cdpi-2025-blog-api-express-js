import * as User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({message: "Utilisateur non trouvée"});
    }
    return res.json(user);
  } catch {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const result = await User.update(id, user);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: "Utilisateur non trouvé"});
    }
    res.json({ id: parseInt(id, 10) });
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.remove(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: "Catégorie non trouvée"});
    }
    res.status(204).send();
  } catch {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser };
