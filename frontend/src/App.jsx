
import { useState } from 'react'
import './App.css'
import Cadastro from './pages/Cadastro.jsx'

const products = [
  {
    id: 1,
    name: 'Tênis Esportivo',
    category: 'Calçados',
    price: 199.90,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
  },
  {
    id: 2,
    name: 'Relógio Moderno',
    category: 'Acessórios',
    price: 249.90,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    id: 3,
    name: 'Mochila Casual',
    category: 'Acessórios',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    id: 4,
    name: 'Fone Bluetooth',
    category: 'Eletrônicos',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [pagina, setPagina] = useState('loja')

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

  // Exibe a tela de cadastro
  if (pagina === 'cadastro') {
    return (
      <Cadastro
        onVoltar={() => setPagina('loja')}
      />
    )
  }

  return (
    <div className="app">

      <header className="header">
        <a href="#" className="logo">
          Digital<span>Store</span>
        </a>

        <nav>
          <a href="#">Início</a>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
        </nav>

        <div className="header-actions">
          <button
            className="account-button"
            onClick={() => setPagina('cadastro')}
          >
            Criar conta
          </button>

          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Carrinho ({cartQuantity})
          </button>
        </div>
      </header>

      <main>

        <section className="hero">
          <div className="hero-content">
            <span className="tag">NOVA COLEÇÃO</span>

            <h1>
              Encontre tudo o que você precisa em um só lugar.
            </h1>

            <p>
              Tecnologia, estilo e praticidade.
              Descubra produtos selecionados para você.
            </p>

            <a href="#produtos" className="hero-button">
              Comprar agora
            </a>
          </div>
        </section>

        <section className="products-section" id="produtos">

          <div className="section-heading">
            <div>
              <span className="tag">NOSSA SELEÇÃO</span>
              <h2>Produtos em destaque</h2>
            </div>

            <p>Confira nossas novidades</p>
          </div>

          <div className="products-grid">

            {products.map((product) => (
              <article className="product-card" key={product.id}>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">
                  <span>{product.category}</span>

                  <h3>{product.name}</h3>

                  <strong>
                    {formatPrice(product.price)}
                  </strong>

                  <button onClick={() => addToCart(product)}>
                    Adicionar ao carrinho
                  </button>
                </div>

              </article>
            ))}

          </div>
        </section>

        {showCart && (
          <section className="cart-section" id="carrinho">

            <div className="cart-header">
              <h2>Meu carrinho de compras</h2>

              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
              >
                ✕ Fechar
              </button>
            </div>

            {cart.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>

                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>

                      <p>Preço: {formatPrice(item.price)}</p>

                      <p>Quantidade: {item.quantity}</p>

                      <strong>
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remover
                    </button>

                  </div>
                ))}

                <div className="cart-total">
                  <h3>Total da compra: {formatPrice(cartTotal)}</h3>
                </div>
              </>
            )}

          </section>
        )}

        <section className="about-section" id="sobre">
          <h2>Bem-vindo à Digital Store</h2>

          <p>
            Uma experiência de compras simples, moderna e segura.
          </p>
        </section>

      </main>

      <footer>
        <p>
          © 2026 Digital Store. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  )
}

export default App
