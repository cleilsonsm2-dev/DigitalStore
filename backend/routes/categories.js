const express = require("express");
const { Category } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// Listar categorias
router.get("/", async (req, res) => {
  const categorias = await Category.findAll();

  res.status(200).json(categorias);
});

// Buscar categoria pelo ID
router.get("/:id", async (req, res) => {
  const categoria = await Category.findByPk(req.params.id);

  if (!categoria) {
    return res.status(404).json({
      message: "Categoria não encontrada"
    });
  }

  res.status(200).json(categoria);
});

// Criar categoria
router.post("/", auth, async (req, res) => {
  const { name, slug } = req.body;

  const categoria = await Category.create({
    name,
    slug
  });

  res.status(201).json(categoria);
});

// Atualizar categoria
router.put("/:id", auth, async (req, res) => {
  const categoria = await Category.findByPk(req.params.id);

  if (!categoria) {
    return res.status(404).json({
      message: "Categoria não encontrada"
    });
  }

  await categoria.update(req.body);

  res.status(200).json(categoria);
});

// Excluir categoria
router.delete("/:id", auth, async (req, res) => {
  const categoria = await Category.findByPk(req.params.id);

  if (!categoria) {
    return res.status(404).json({
      message: "Categoria não encontrada"
    });
  }

  await categoria.destroy();

  res.status(204).send();
});

module.exports = router;