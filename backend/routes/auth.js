
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const router = express.Router();

// CADASTRO DE USUÁRIO
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos."
      });
    }

    const nomeLimpo = name.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      return res.status(400).json({
        message: "Informe um nome e um e-mail válidos."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 8 caracteres."
      });
    }

    const usuarioExiste = await User.findOne({
      where: { email: emailLimpo }
    });

    if (usuarioExiste) {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado."
      });
    }

    const senhaCriptografada = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      name: nomeLimpo,
      email: emailLimpo,
      password: senhaCriptografada
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.error("Erro no cadastro:", erro.message);

    if (erro.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado."
      });
    }

    return res.status(500).json({
      message: "Erro interno ao cadastrar usuário."
    });
  }
});


// LOGIN DE USUÁRIO
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Informe seu e-mail e sua senha."
      });
    }

    const emailLimpo = email.trim().toLowerCase();

    const usuario = await User.findOne({
      where: { email: emailLimpo }
    });

    if (!usuario) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos."
      });
    }

    const senhaCorreta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos."
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não configurado.");

      return res.status(500).json({
        message: "Configuração de autenticação indisponível."
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
      }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.error("Erro no login:", erro.message);

    return res.status(500).json({
      message: "Erro interno ao realizar login."
    });
  }
});

module.exports = router;
