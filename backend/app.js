const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const Post = require("./models/post");
const userRoutes = require("./user");
const checkAuth = require("./middleware/check-auth");

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
app.use("/images", express.static(path.join("backend/imagens")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, X-Auth-Token, Authorization, token");

  next();
});

app.post("/api/posts/add", checkAuth, multer({ storage }).single("image"), (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const post = new Post({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    imagePath: `${url}/images/${req.file.filename}`,
    criador: req.userData.userId,
  });
  post.save().then((saveDoc) => res.status(201).json({
    message: "Adicionado com sucesso",
    post: saveDoc,
  }));
});

app.get("/api/posts", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let dadosR = [];
  if (pageSize !== 0 && currentPage !== 0) {
    postQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then((dados) => {
    dadosR = dados;
    return Post.count();
  })

    .then((count) => res.status(200).json({
      message: "Posts fetched successfully!",
      posts: dadosR,
      count,
    }));
});

app.put("/api/post/:id", checkAuth, multer({ storage }).single("imagePath"), (req, res, next) => {
  let { imagePath } = req.body;
  if (req.file) {
    const url = `${req.protocol}://${req.get("host")}`;
    imagePath = `${url}/images/${req.file.filename}`;
  }
  const post = new Post({
    _id: req.params.id,
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    imagePath,
    criador: req.userData.userId,
  });
  Post.updateOne({

    // eslint-disable-next-line no-undef
    _id: req.params.id,
    criador: req.userData.userId,

  }, post).then((resultado) => {
    if (resultado.nModified > 0) {
      res.status(201).json({ message: "atualizado com sucesso" });
      console.log(`${post.titulo} atualizado com sucesso`);
    } else {
      res.status(401).json({
        message: "Usuário não autorizado para editar esse Post",
      });
    }
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

app.delete("/api/posts/:id", checkAuth, (req, res) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id, criador: req.userData.userId }).then((retorno) => {
    if (retorno.n > 0) {
      res.status(201).json({ mensagem: "Excluido com sucesso" });
    } else {
      res.status(401).json({
        mensagem: "Usuário não autorizado para excluir esse Post",
      });
    }
  });
});

app.use("/api/user", userRoutes);

module.exports = app;
