import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as User from "../models/user.model.js";
import AppError from "../errors/AppError.js";

const register = async (firstname, lastname, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await User.create(firstname, lastname, email, hashedPassword);
  return result.insertId;
};

const login = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError("Identifiants invalides", 401);
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Identifiants invalides", 401);
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  return token;
};

export { register, login };
