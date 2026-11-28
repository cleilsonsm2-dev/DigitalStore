const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

    if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não configurado.");

    return res.status(500).json({
      message: "Configuração de autenticação indisponível."
    });
  }

  if (!token) {
    return res.status(401).json({
      message: "Token não informado"
    });
  }

  try {
    const partesToken = token.split(" ");

if (
  partesToken.length !== 2 ||
  partesToken[0] !== "Bearer" ||
  !partesToken[1]
) {
  return res.status(401).json({
    message: "Formato de token inválido."
  });
}

const tokenLimpo = partesToken[1];

    const usuario = jwt.verify(
      tokenLimpo,
      process.env.JWT_SECRET
    );


if (!usuario || !usuario.id) {
  return res.status(401).json({
    message: "Token inválido."
  });
}
    req.usuario = usuario;

    next();
  } catch (erro) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }
}

module.exports = auth;