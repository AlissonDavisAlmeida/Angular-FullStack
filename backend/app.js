const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Post = require("./models/post");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIME TYPE");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/imagens");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const app = express();
mongoose.connect("mongodb+srv://Alisson:MCyH82PPgMzG4hk@cluster0.pgaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => console.log("Conectado com sucesso"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, X-Auth-Token");

  next();
});

app.post("/api/posts/add", multer({ storage }).single("image"), (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const post = new Post({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    imagePath: `${url}/images/${req.file.filename}`,
  });
  post.save().then((saveDoc) => {
    res.status(201).json({
      message: "Adicionado com sucesso",
      post: saveDoc,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find((erro, dados) => res.status(200).json({
    message: "Posts fetched successfully!",
    posts: dados,
  }));
});

app.put("/api/post/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  });
  Post.updateOne({

    // eslint-disable-next-line no-undef
    _id: req.params.id,

  }, post).then((resultado) => {
    console.log(`${post.titulo} atualizado com sucesso`);
    res.status(201).json({ message: "atualizado com sucesso" });
  });
});

app.get("/api/post/:id", (req, res) => {
  Post.findById(req.params.id).then((resultado) => {
    if (resultado) {
      res.status(201).json(resultado);
    } else {
      res.status(404).json({ message: "Recurso não encontrado" });
    }
  });
});

app.delete("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((retorno) => {
    console.log(retorno);
  });
  res.status(200).json({ mensagem: "Post deletado" });
});

module.exports = app;
