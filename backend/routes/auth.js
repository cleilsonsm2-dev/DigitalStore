
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");

const { User, PasswordReset } = require("../models");
const sequelize = require("../config/database");

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
  email: usuario.email,
  role: usuario.role
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

// SOLICITAR RECUPERAÇÃO DE SENHA
router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: "Informe um e-mail válido."
      });
    }

    const usuario = await User.findOne({
      where: { email }
    });

    const mensagem =
      "Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha.";

    if (!usuario) {
      return res.status(200).json({ message: mensagem });
    }

    // Invalida solicitações anteriores ainda não utilizadas
    await PasswordReset.update(
      { used: true },
      {
        where: {
          userId: usuario.id,
          used: false
        }
      }
    );

    // Gera token aleatório
    const token = crypto.randomBytes(32).toString("hex");

    // Armazena somente o hash do token
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Validade de 15 minutos
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const solicitacao = await PasswordReset.create({
      userId: usuario.id,
      tokenHash,
      expiresAt,
      used: false
    });

    const frontendUrl = (
      process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/+$/, "");

    const linkRecuperacao = `${frontendUrl}/?token=${token}`;

    const nomeSeguro = usuario.name
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    const enviarEmail = require("../services/emailService");

    try {
      await enviarEmail(
        usuario.email,
        "Recuperação de senha - Digital Store",
        `
          <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; padding: 25px;">
            <h2 style="color: #00b4d8;">Digital Store</h2>

            <p>Olá, ${nomeSeguro}!</p>

            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>

            <p>Clique no botão abaixo para criar uma nova senha:</p>

            <a
              href="${linkRecuperacao}"
              style="display: inline-block; padding: 14px 22px; background: #00b4d8; color: white; text-decoration: none; border-radius: 6px;"
            >
              Redefinir minha senha
            </a>

            <p>Este link expira em 15 minutos e só pode ser utilizado uma vez.</p>

            <p>Se você não solicitou a recuperação, ignore este e-mail.</p>

            <p>Equipe Digital Store</p>
          </div>
        `
      );
    } catch (erroEmail) {
      await solicitacao.update({ used: true });

      console.error(
        "Falha no envio do e-mail de recuperação:",
        erroEmail.message
      );
    }

    return res.status(200).json({ message: mensagem });

  } catch (erro) {
    console.error("Erro ao solicitar recuperação:", erro.message);

    return res.status(500).json({
      message: "Não foi possível processar sua solicitação."
    });
  }
});


// REDEFINIR SENHA
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validar token
    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/i.test(token)
    ) {
      return res.status(400).json({
        message: "Link de recuperação inválido ou expirado."
      });
    }

    // Validar nova senha
    if (
      typeof password !== "string" ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 8 caracteres."
      });
    }

    // Gerar hash do token recebido
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Criptografar a nova senha
    const novaSenhaCriptografada = await bcrypt.hash(password, 10);

    // Executar atualização dentro de uma transação
    const resultado = await sequelize.transaction(async (transaction) => {
      const solicitacao = await PasswordReset.findOne({
        where: {
          tokenHash,
          used: false,
          expiresAt: {
            [Op.gt]: new Date()
          }
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!solicitacao) {
        return false;
      }

      const usuario = await User.findByPk(solicitacao.userId, {
        transaction
      });

      if (!usuario) {
        return false;
      }

      // Marca o token como utilizado
      await solicitacao.update(
        { used: true },
        { transaction }
      );

      // Atualiza a senha do usuário
      await usuario.update(
        { password: novaSenhaCriptografada },
        { transaction }
      );

      return true;
    });

    if (!resultado) {
      return res.status(400).json({
        message: "Link de recuperação inválido ou expirado."
      });
    }

    return res.status(200).json({
      message: "Senha redefinida com sucesso! Você já pode fazer login."
    });

  } catch (erro) {
    console.error("Erro ao redefinir senha:", erro.message);

    return res.status(500).json({
      message: "Não foi possível redefinir sua senha."
    });
  }
});

module.exports = router;
