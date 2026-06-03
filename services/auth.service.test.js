import { describe, it, expect, vi } from "vitest";
import { login, register } from "./auth.service.js";
import * as User from "../models/user.model.js";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError.js";

vi.mock("../models/user.model.js");

process.env.JWT_SECRET = "secret_test";

describe("authService", () => {
  describe("register", () => {
    it("retourne l'insertId après création", async () => {
      // Arrange
      User.create.mockResolvedValue({ insertId: 42 });

      // Act
      const result = await register(
        "John",
        "Doe",
        "john@example.com",
        "password123",
      );

      // Assert
      expect(result).toBe(42);
    });

    it("stocke le mot de passe hashé, pas en clair", async () => {
      // Arrange
      // Ici, on fournit une valeur de retour à User.create pour que register
      // s'exécute jusqu'au bout sans erreur.
      User.create.mockResolvedValue({ insertId: 1 });

      // Act
      await register("John", "Doe", "john@example.com", "password123");

      // Assert
      const hashedPassword = User.create.mock.calls[0][3];
      expect(hashedPassword).not.toBe("password123");
    });
  });

  describe("login", () => {
    it("lance une AppError 401 si l'utilisateur n'existe pas", async () => {
      // Arrange
      User.findByEmail.mockResolvedValue(null);

      // Act
      const error = await login("inconnu@example.com", "password123").catch(
        (e) => e,
      );

      // Assert
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(401);
    });

    it("lance une AppError 401 si le mot de passe est invalide", async () => {
      // Arrange
      const hashedPassword = bcrypt.hashSync("bon_password", 10);
      User.findByEmail.mockResolvedValue({
        id: 1,
        role: "user",
        password: hashedPassword,
      });

      // Act
      const error = await login("john@example.com", "mauvais_password").catch(
        (e) => e,
      );

      // Assert
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(401);
    });
    
    it("retourne un token JWT si les credentials sont valides", async () => {
      // Arrange
      const hashedPassword = bcrypt.hashSync("password123", 10);
      User.findByEmail.mockResolvedValue({
        id: 1,
        role: "user",
        password: hashedPassword,
      });

      // Act
      const token = await login("john@example.com", "password123");

      // Assert
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });
  });
});
