const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Função para enviar e-mails
async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    const resultado = await transporter.sendMail({
      from: `"Digital Store" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: assunto,
      html: mensagem
    });

    console.log("E-mail enviado:", resultado.messageId);

    return resultado;

  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro.message);
    throw erro;
  }
}

module.exports = enviarEmail;