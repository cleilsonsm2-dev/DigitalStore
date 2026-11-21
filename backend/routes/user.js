const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// Buscar usuário
router.get("/:id", auth, async (req, res) => {
  const usuario = await User.findByPk(req.params.id, {
    attributes: ["id", "name", "email"]
  });

  if (!usuario) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  res.status(200).json(usuario);
});

// Atualizar usuário
router.put("/:id", auth, async (req, res) => {
  if (Number(req.params.id) !== req.usuario.id) {
    return res.status(403).json({
      message: "Você não pode alterar outro usuário"
    });
  }

  const usuario = await User.findByPk(req.params.id);

  if (!usuario) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  const dados = {
    name: req.body.name,
    email: req.body.email
  };

  if (req.body.password) {
    dados.password = await bcrypt.hash(
      req.body.password,
      10
    );
  }

  await usuario.update(dados);

  res.status(200).json({
    id: usuario.id,
    name: usuario.name,
    email: usuario.email
  });
});

// Excluir usuário
router.delete("/:id", auth, async (req, res) => {
  if (Number(req.params.id) !== req.usuario.id) {
    return res.status(403).json({
      message: "Você não pode excluir outro usuário"
    });
  }

  const usuario = await User.findByPk(req.params.id);

  if (!usuario) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  await usuario.destroy();

  res.status(204).send();
});

module.exports = router;