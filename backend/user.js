const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const rotas = express();

rotas.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.senha, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        senha: hash,
      });
      user.save().then((result) => {
        res.status(201).json({
          message: "Usuário Criado",
          result,
        });
      }).catch((err) => {
        res.status(500).json({
          erro: err,
        });
      });
    });
});

module.exports = rotas;
