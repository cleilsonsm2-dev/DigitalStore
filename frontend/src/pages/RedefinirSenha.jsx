
import { useState } from "react";
import "./RedefinirSenha.css";

function RedefinirSenha({ token, onVoltar }) {
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setErro(false);

    if (password.length < 8) {
      setErro(true);
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setErro(true);
      setMensagem("As senhas não são iguais.");
      return;
    }

    if (!token) {
      setErro(true);
      setMensagem("Link inválido. Solicite uma nova recuperação.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token, password })
        }
      );

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dados.message || "Não foi possível redefinir sua senha."
        );
      }

      setMensagem(dados.message || "Senha redefinida com sucesso!");
      setConcluido(true);
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
    <div className="redefinir-container">
      <div className="redefinir-card">
        <h1>Digital<span>Store</span></h1>

        <h2>Crie uma nova senha</h2>

        <p className="redefinir-descricao">
          Escolha uma senha com pelo menos 8 caracteres.
        </p>

        {!concluido ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="nova-senha">Nova senha</label>

            <input
              id="nova-senha"
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />

            <label htmlFor="confirmar-senha">Confirme a nova senha</label>

            <input
              id="confirmar-senha"
              type="password"
              placeholder="Digite novamente sua senha"
              value={confirmarPassword}
              onChange={(event) => setConfirmarPassword(event.target.value)}
              minLength={8}
              required
            />

            {mensagem && (
              <p
                className={`redefinir-mensagem ${erro ? "erro" : "sucesso"}`}
                role="status"
              >
                {mensagem}
              </p>
            )}

            <button type="submit" disabled={carregando}>
              {carregando ? "Salvando..." : "Redefinir senha"}
            </button>
          </form>
        ) : (
          <>
            <p className="redefinir-mensagem sucesso" role="status">
              {mensagem}
            </p>

            <button
              type="button"
              onClick={onVoltar}
              className="redefinir-voltar"
            >
              Ir para o login
            </button>
          </>
        )}

        {!concluido && (
          <button
            type="button"
            className="redefinir-voltar"
            onClick={onVoltar}
          >
            Voltar para o login
          </button>
        )}
      </div>
    </div>
  );
}

export default RedefinirSenha;
