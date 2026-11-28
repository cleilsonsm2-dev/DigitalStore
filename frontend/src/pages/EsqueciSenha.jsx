
import { useState } from "react";
import "./EsqueciSenha.css";

function EsqueciSenha({ onVoltar }) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setErro(false);
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dados.message || "Não foi possível enviar a solicitação."
        );
      }

      setMensagem(
        dados.message ||
        "Se o e-mail estiver cadastrado, você receberá as instruções."
      );
    } catch (error) {
      setErro(true);
      setMensagem(
        error.message || "Não foi possível conectar ao servidor."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="esqueci-container">
      <div className="esqueci-card">
        <h1>Digital<span>Store</span></h1>

        <h2>Esqueceu sua senha?</h2>

        <p className="esqueci-descricao">
          Informe o e-mail cadastrado. Se ele estiver registrado,
          enviaremos um link para você criar uma nova senha.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email-recuperacao">E-mail</label>

          <input
            id="email-recuperacao"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {mensagem && (
            <p
              className={`esqueci-mensagem ${erro ? "erro" : "sucesso"}`}
              role="status"
            >
              {mensagem}
            </p>
          )}

          <button type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>

        <button
          type="button"
          className="esqueci-voltar"
          onClick={onVoltar}
        >
          Voltar para o login
        </button>
      </div>
    </div>
  );
}

export default EsqueciSenha;
