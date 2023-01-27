const Sequelize = require("sequelize");
const db = require("../database/database");

const barang = db.define(
  "barang",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nama_barang: { type: Sequelize.STRING(225), allowNull: false },
    harga: { type: Sequelize.INTEGER, allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

db.sync({ alter: true })
  .then(() => {
    console.log("Barang table  created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Barang table:", error.message);
  });

module.exports = barang;
