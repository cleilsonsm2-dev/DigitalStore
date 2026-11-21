
import { useState } from "react";
import "./Cadastro.css";

function Cadastro({ onVoltar, onCadastroSucesso }) {
  const [formulario, setFormulario] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");

    if (formulario.password !== formulario.confirmPassword) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    if (formulario.password.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formulario.name,
            email: formulario.email,
            password: formulario.password
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.message || "Erro ao cadastrar.");
      }

      setMensagem("Cadastro realizado com sucesso!");

      setFormulario({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      if (onCadastroSucesso) {
        onCadastroSucesso(dados.usuario);
      }

    } catch (erro) {
      setMensagem(
        erro.message || "Não foi possível conectar ao servidor."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">

        <h1>Digital<span>Store</span></h1>

        <h2>Criar sua conta</h2>

        <p className="cadastro-descricao">
          Cadastre-se e aproveite nossas ofertas.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Nome completo</label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={formulario.name}
            onChange={handleChange}
            required
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formulario.email}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Mínimo de 8 caracteres"
            value={formulario.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <label>Confirmar senha</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repita sua senha"
            value={formulario.confirmPassword}
            onChange={handleChange}
            required
          />

          {mensagem && (
            <p className="cadastro-mensagem" role="status">
              {mensagem}
            </p>
          )}

          <button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Criar minha conta"}
          </button>

        </form>

        <p className="cadastro-voltar">
          Já possui uma conta?
          <button type="button" onClick={onVoltar}>
            Voltar ao login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Cadastro;
