const User = require("./user");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const ProductOption = require("./ProductOption");
const PasswordReset = require("./PasswordReset");

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

// Usuário pode ter várias solicitações de recuperação
User.hasMany(PasswordReset, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

PasswordReset.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = {
  User,
  Category,
  Product,
  ProductImage,
  ProductOption,
  PasswordReset
};