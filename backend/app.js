const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");
const storage = require("./middleware/fileMulter");

const userRoutes = require("./user");
const checkAuth = require("./middleware/check-auth");

const {
  adicionarPost, pegarTodosPosts, atualizarPost, postID, removerPost,
} = require("./controllers/posts");

const app = express();

mongoose.connect(`mongodb+srv://Alisson:${process.env.MONGO_ATLAS_SENHA}@cluster0.pgaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(() => console.log("Conectado com sucesso"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/imagens")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, X-Auth-Token, Authorization, token");

  next();
});

app.post("/api/posts/add", checkAuth, multer({ storage }).single("image"), adicionarPost);

app.get("/api/posts", pegarTodosPosts);

app.put("/api/post/:id", checkAuth, multer({ storage }).single("imagePath"), atualizarPost);

app.get("/api/post/:id", postID);

app.delete("/api/posts/:id", checkAuth, removerPost);

app.use("/api/user", userRoutes);

module.exports = app;
