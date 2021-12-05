const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();
mongoose.connect("mongodb+srv://Alisson:MCyH82PPgMzG4hk@cluster0.pgaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => console.log("Conectado com sucesso"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  next();
});

app.post("/api/posts/add", (req, res, next) => {
  const post = new Post({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  });
  post.save().then((saveDoc) => {

  });

  res.status(201).json({
    message: "Adicionado com sucesso",
    post,
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find((erro, dados) => res.status(200).json({
    message: "Posts fetched successfully!",
    posts: dados,
  }));
});

app.delete("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((retorno) => {
    console.log(retorno);
  });
  res.status(200).json({ mensagem: "Post deletado" });
});

module.exports = app;
