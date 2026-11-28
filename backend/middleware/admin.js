
const { User } = require("../models");

async function admin(req, res, next) {
  try {
    const usuario = await User.findByPk(req.usuario.id);

    if (!usuario) {
      return res.status(401).json({
        message: "Usuário não encontrado."
      });
    }

    if (usuario.role !== "admin") {
      return res.status(403).json({
        message: "Acesso permitido apenas para administradores."
      });
    }

    next();

  } catch (erro) {
    console.error("Erro ao verificar permissão:", erro.message);

    return res.status(500).json({
      message: "Erro ao verificar permissões."
    });
  }
}

module.exports = admin;
