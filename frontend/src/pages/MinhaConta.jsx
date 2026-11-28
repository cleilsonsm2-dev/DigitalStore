
import { useState, useEffect } from "react";
import "./MinhaConta.css";

function MinhaConta({ usuario, onVoltar, onUsuarioAtualizado }) {
  const [name, setName] = useState(usuario?.name || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setName(usuario?.name || "");
    setEmail(usuario?.email || "");
  }, [usuario]);

  async function handleSubmit(event) {
    event.preventDefault();

    setMensagem("");
    setTipoMensagem("");

    if (newPassword && !currentPassword) {
      setMensagem("Informe sua senha atual para alterá-la.");
      setTipoMensagem("erro");
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setMensagem("A nova senha deve ter pelo menos 8 caracteres.");
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);

    try {
      const token = localStorage.getItem("token");

      const dadosAtualizacao = {
        name,
        email
      };

      if (newPassword) {
        dadosAtualizacao.currentPassword = currentPassword;
        dadosAtualizacao.password = newPassword;
      }

      const resposta = await fetch(
        `http://localhost:3000/api/users/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(dadosAtualizacao)
        }
      );

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dados.message || "Não foi possível atualizar seus dados."
        );
      }

      onUsuarioAtualizado(dados.usuario);

      setCurrentPassword("");
      setNewPassword("");

      setMensagem(
        newPassword
          ? "Dados e senha atualizados com sucesso!"
          : "Seus dados foram atualizados com sucesso!"
      );

      setTipoMensagem("sucesso");

    } catch (erro) {
      setMensagem(erro.message);
      setTipoMensagem("erro");

    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="minha-conta-container">

      <div className="minha-conta-card">

        <h1>
          Digital<span>Store</span>
        </h1>

        <h2>Minha conta</h2>

        <p className="conta-descricao">
          Consulte e atualize seus dados cadastrais.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="nome">Nome completo</label>

          <input
            id="nome"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="email-conta">E-mail</label>

          <input
            id="email-conta"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <hr />

          <h3>Alterar senha</h3>

          <p className="conta-descricao">
            Preencha os campos abaixo somente se desejar alterar sua senha.
          </p>

          <label htmlFor="senha-atual">Senha atual</label>

          <input
            id="senha-atual"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <label htmlFor="nova-senha">Nova senha</label>

          <input
            id="nova-senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />

          {mensagem && (
            <p className={`conta-mensagem ${tipoMensagem}`}>
              {mensagem}
            </p>
          )}

          <button type="submit" disabled={carregando}>
            {carregando ? "Salvando..." : "Salvar alterações"}
          </button>

        </form>

        <button
          type="button"
          className="conta-voltar"
          onClick={onVoltar}
        >
          Voltar para a loja
        </button>

      </div>

    </div>
  );
}

export default MinhaConta;
