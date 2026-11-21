const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const {
  User,
  Category,
  Product,
  ProductImage,
  ProductOption
} = require("./models");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Digital Store API funcionando!");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Digital Store API funcionando!"
  });
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Criar dados iniciais
async function criarDadosIniciais() {
  const quantidade = await Category.count();

  if (quantidade === 0) {
    const tenis = await Category.create({
      name: "Tênis",
      slug: "tenis"
    });

    const camisetas = await Category.create({
      name: "Camisetas",
      slug: "camisetas"
    });

    const calcas = await Category.create({
      name: "Calças",
      slug: "calcas"
    });

    const produto1 = await Product.create({
      name: "Tênis Nike Air Max",
      description: "Tênis confortável para o dia a dia.",
      price: 599.90,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    });

    await produto1.addCategory(tenis);

    const produto2 = await Product.create({
      name: "Tênis Adidas Casual",
      description: "Modelo moderno e versátil.",
      price: 399.90,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    });

    await produto2.addCategory(tenis);

    const produto3 = await Product.create({
      name: "Camiseta Básica",
      description: "Camiseta confortável de algodão.",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
    });

    await produto3.addCategory(camisetas);

    const produto4 = await Product.create({
      name: "Calça Jeans",
      description: "Calça jeans moderna.",
      price: 199.90,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
    });

    await produto4.addCategory(calcas);

    console.log("Produtos iniciais criados!");
  }
}

// Iniciar servidor
async function iniciarServidor() {
  try {
    await sequelize.authenticate();

    console.log("Conectado ao MySQL!");

    await sequelize.sync();

    await criarDadosIniciais();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.log("Erro ao iniciar:", erro.message);
  }
}

iniciarServidor();