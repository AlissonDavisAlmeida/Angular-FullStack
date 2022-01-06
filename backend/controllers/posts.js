const Post = require("../models/post");

exports.adicionarPost = (req, res, next) => {
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
  })).catch((err) => {
    res.status(500).json({
      erro: {
        message: "Ocorreu uma falha na criação de um post",
      },
    });
  });
};

exports.pegarTodosPosts = (req, res, next) => {
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
};

exports.atualizarPost = (req, res, next) => {
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
};

exports.postID = (req, res) => {
  Post.findById(req.params.id).then((resultado) => {
    if (resultado) {
      res.status(201).json(resultado);
    } else {
      res.status(404).json({ message: "Recurso não encontrado" });
    }
  });
};

exports.removerPost = (req, res) => {
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
};
