const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.senha, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        senha: hash,
      });
      user.save().then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Usuário Criado",
          result,
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          erro: {
            message: "Autenticação Inválida",
          },
        });
      });
    });
};

exports.loginUser = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.senha, user.senha).then((retorno) => {
        if (retorno) {
          const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
          return res.status(200).json({
            mensagem: "Login feito com sucesso",
            token,
            expiresIn: "3600",
            userId: user._id,
          });
        }
        return res.status(401).json({
          mensagem: "Falha no Login, cadastre-se",
          erro: {
            message: "Falha no Login",
          },
        });
      }).catch((err) => res.status(401).json({
        mensagem: "Erro no login, cadastre-se",
        erro: err,
      }));
    } else {
      return res.status(401).json({
        mensagem: "Não existe o endereço de email, cadastre-se",
        erro: {
          message: "Não existe o endereço de email, cadastre-se",
        },
      });
    }
  });
};
