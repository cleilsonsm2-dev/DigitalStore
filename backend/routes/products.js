const express = require("express");

const {
  Product,
  Category,
  ProductImage,
  ProductOption
} = require("../models");

const auth = require("../middleware/auth");

const router = express.Router();

const incluirRelacionamentos = [
  Category,
  ProductImage,
  ProductOption
];

// Listar produtos
router.get("/", async (req, res) => {
  const produtos = await Product.findAll({
    include: incluirRelacionamentos
  });

  res.status(200).json(produtos);
});

// Buscar produto pelo ID
router.get("/:id", async (req, res) => {
  const produto = await Product.findByPk(req.params.id, {
    include: incluirRelacionamentos
  });

  if (!produto) {
    return res.status(404).json({
      message: "Produto não encontrado"
    });
  }

  res.status(200).json(produto);
});

// Criar produto
router.post("/", auth, async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    categoryIds,
    images,
    options
  } = req.body;

  const produto = await Product.create({
    name,
    description,
    price,
    image
  });

  if (categoryIds && categoryIds.length > 0) {
    await produto.setCategories(categoryIds);
  }

  if (images && images.length > 0) {
    await produto.createProductImages(
      images.map(url => ({ url }))
    );
  }

  if (options && options.length > 0) {
    await produto.createProductOptions(options);
  }

  const produtoCompleto = await Product.findByPk(produto.id, {
    include: incluirRelacionamentos
  });

  res.status(201).json(produtoCompleto);
});

// Atualizar produto
router.put("/:id", auth, async (req, res) => {
  const produto = await Product.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({
      message: "Produto não encontrado"
    });
  }

  await produto.update(req.body);

  if (req.body.categoryIds) {
    await produto.setCategories(req.body.categoryIds);
  }

  const produtoAtualizado = await Product.findByPk(produto.id, {
    include: incluirRelacionamentos
  });

  res.status(200).json(produtoAtualizado);
});

// Excluir produto
router.delete("/:id", auth, async (req, res) => {
  const produto = await Product.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({
      message: "Produto não encontrado"
    });
  }

  await produto.destroy();

  res.status(204).send();
});

module.exports = router;