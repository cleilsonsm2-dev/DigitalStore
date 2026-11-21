const User = require("./user");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const ProductOption = require("./ProductOption");

// Produto possui imagens
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

// Produto possui opções
Product.hasMany(ProductOption);
ProductOption.belongsTo(Product);

// Produto pode ter várias categorias
Product.belongsToMany(Category, {
  through: "ProductCategories"
});

Category.belongsToMany(Product, {
  through: "ProductCategories"
});

module.exports = {
  User,
  Category,
  Product,
  ProductImage,
  ProductOption
};