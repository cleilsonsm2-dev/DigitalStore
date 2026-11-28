
import { useState } from "react";
import "./Login.css";

function Login({ onVoltar, onCriarConta, onLoginSucesso, onEsqueciSenha }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || "E-mail ou senha inválidos.");
      }

      if (!dados.token) {
        throw new Error("O servidor não retornou o token de acesso.");
      }

      localStorage.setItem("token", dados.token);

      setMensagem("Login realizado com sucesso!");

      if (onLoginSucesso) {
        onLoginSucesso(dados.usuario);
      }

    } catch (erro) {
      setMensagem(erro.message || "Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>
          Digital<span>Store</span>
        </h1>

        <h2>Bem-vindo de volta!</h2>

        <p className="login-descricao">
          Entre com seus dados para acessar sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>

          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>

          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

<button
  type="button"
  className="login-esqueci-senha"
  onClick={onEsqueciSenha}
>
  Esqueci minha senha
</button>

          {mensagem && (
            <p className="login-mensagem" role="status">
              {mensagem}
            </p>
          )}

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="login-cadastro">
          Ainda não possui uma conta?
          <button type="button" onClick={onCriarConta}>
            Criar conta
          </button>
        </p>

        <button
          type="button"
          className="login-voltar"
          onClick={onVoltar}
        >
          Voltar para a loja
        </button>

      </div>
    </div>
  );
}

export default Login;
