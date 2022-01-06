const express = require("express");

const { createUser, loginUser } = require("./controllers/user");

const rotas = express();

rotas.post("/signup", createUser);

rotas.post("/login", loginUser);

module.exports = rotas;
