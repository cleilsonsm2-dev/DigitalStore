
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">
            Digital<span>Store</span>
          </h1>
          <nav>
            <a href="/">Início </a>
            <a href="/produtos"> Produtos </a>
            <a href="/categorias"> Categorias</a>
          </nav>

          <div className="header-actions">
            <button type="button">Entrar</button>
            <button type="button">Carrinho (0)</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>Bem-vindo à Digital Store!</h2>

            <p>
              Encontre os melhores produtos com qualidade
              e preços especiais.
            </p>

            <button type="button" className="btn-primary">
              Explorar produtos
            </button>
          </div>
        </section>

        <section className="products container">
          <h2>Nossos produtos</h2>

          <p>
            Em breve, você encontrará aqui nossos produtos
            disponíveis.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2026 Digital Store. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}

export default App
