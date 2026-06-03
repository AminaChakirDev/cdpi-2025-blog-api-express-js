import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as AuthService from "../services/auth.service.js";

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const id = await AuthService.register(firstname, lastname, email, password);

  res.status(201).json({ id, email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await AuthService.login(email, password);
  res.json({ token });
};

export { register, login };
