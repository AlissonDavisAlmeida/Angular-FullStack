const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, "oakdaofaodaodjaodf0");
    next();
  } catch (err) {
    return res.status(401).json({
      mensagem: "É preciso estar logado para criar algum post",
    });
  }
};
