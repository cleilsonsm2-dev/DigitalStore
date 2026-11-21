const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos"
      });
    }

    const usuarioExiste = await User.findOne({
      where: { email }
    });

    if (usuarioExiste) {
      return res.status(400).json({
        message: "Email já cadastrado"
      });
    }

    const senhaCriptografada = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      name,
      email,
      password: senhaCriptografada
    });

    res.status(201).json({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email
    });
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao cadastrar usuário"
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({
        message: "Email ou senha inválidos"
      });
    }

    const senhaCorreta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        message: "Email ou senha inválidos"
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

    res.status(200).json({
      message: "Login realizado",
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email
      }
    });
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao realizar login"
    });
  }
});

module.exports = router;