const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token não informado"
    });
  }

  try {
    const tokenLimpo = token.replace("Bearer ", "");

    const usuario = jwt.verify(
      tokenLimpo,
      process.env.JWT_SECRET
    );

    req.usuario = usuario;

    next();
  } catch (erro) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }
}

module.exports = auth;