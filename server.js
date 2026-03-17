require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const articleRoutes = require("./routes/article.routes");
const userRoutes = require("./routes/user.routes");
const likeRoutes = require("./routes/like.routes");

const port = 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/articles", articleRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
