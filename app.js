import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import articleRoutes from "./routes/article.routes.js";
import userRoutes from "./routes/user.routes.js";
import likeRoutes from "./routes/like.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

const port = 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API blog en ligne" });
});

app.use("/categories", categoryRoutes);
app.use("/articles", articleRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
