
const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// Dados públicos do usuário
function dadosPublicos(usuario) {
  return {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email
  };
}

// CONSULTAR USUÁRIO LOGADO
router.get("/me", auth, async (req, res) => {
  try {
    const usuario = await User.findByPk(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res.status(200).json(dadosPublicos(usuario));

  } catch (erro) {
    console.error("Erro ao consultar usuário:", erro.message);

    return res.status(500).json({
      message: "Erro ao consultar usuário."
    });
  }
});

// BUSCAR USUÁRIO PELO ID
router.get("/:id", auth, async (req, res) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.id)) {
      return res.status(403).json({
        message: "Acesso não autorizado."
      });
    }

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res.status(200).json(dadosPublicos(usuario));

  } catch (erro) {
    return res.status(500).json({
      message: "Erro ao consultar usuário."
    });
  }
});

// ATUALIZAR USUÁRIO
router.put("/:id", auth, async (req, res) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.id)) {
      return res.status(403).json({
        message: "Você não pode alterar outra conta."
      });
    }

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    const dados = {};

    if (req.body.name !== undefined) {
      const nome = req.body.name.trim();

      if (!nome) {
        return res.status(400).json({
          message: "Informe um nome válido."
        });
      }

      dados.name = nome;
    }

    if (req.body.email !== undefined) {
      const email = req.body.email.trim().toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          message: "Informe um e-mail válido."
        });
      }

      dados.email = email;
    }

    if (req.body.password) {
      if (req.body.password.length < 8) {
        return res.status(400).json({
          message: "A senha deve ter pelo menos 8 caracteres."
        });
      }

      dados.password = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    await usuario.update(dados);

    return res.status(200).json({
      message: "Conta atualizada com sucesso!",
      usuario: dadosPublicos(usuario)
    });

  } catch (erro) {
    if (erro.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado."
      });
    }

    console.error("Erro ao atualizar usuário:", erro.message);

    return res.status(500).json({
      message: "Erro ao atualizar conta."
    });
  }
});

// EXCLUIR USUÁRIO
router.delete("/:id", auth, async (req, res) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.id)) {
      return res.status(403).json({
        message: "Você não pode excluir outra conta."
      });
    }

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    await usuario.destroy();

    return res.status(204).send();

  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro.message);

    return res.status(500).json({
      message: "Erro ao excluir conta."
    });
  }
});

module.exports = router;
