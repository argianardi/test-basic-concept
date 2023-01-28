const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

//initialize express
const app = express();

// use packages
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------------------- No.1 Bilangan fibonaci------------------------
app.get("/fibonaci", (req, res) => {
  const { input } = req.body;

  if (input < 1) {
    return res.status(400).json({
      success: false,
      message: "jumlah angka minimal 1 ",
    });
  }

  const result = [0, 1];

  for (let i = 2; i <= input + 2; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  let fibonaciGanjil = [];
  for (var i = 0; i < result.length; i++) {
    if (result[i] % 2 !== 0) {
      fibonaciGanjil.push(result[i]);
    }
  }
  fibonaciGanjil.reverse();

  res.status(200).json({
    succes: "true",
    data: fibonaciGanjil,
  });
});

//----------------------------- No.2 Irsan string------------------------
app.get("/irisan-string", (req, res) => {
  const { input } = req.body;

  const findSameChar = (str) => {
    const alfabet = "abcdefghijklmnopqrstuvwxyz";
    if (alfabet.includes(str) === true) {
      return str.length;
    } else {
      return 0;
    }
  };
  const sameChar = findSameChar(input);

  res.status(200).json({
    succes: "true",
    data: sameChar,
  });
});

//----------------------------- No.3 Menampilkan object------------------------
const barang = require("./configs/models/barang");

//API post request Untuk membuat object
app.post("/create-object", async (req, res) => {
  const { nama_barang, harga, stock } = req.body;

  if (!(nama_barang && harga && stock)) {
    return res.status(400).json({
      success: false,
      message: "Data belum lengkap",
    });
  }

  try {
    const dataBarang = await barang.create({
      nama_barang,
      harga,
      stock,
    });
    res.status(201).json({
      success: true,
      message: "Barang berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// API get request untuk menampilkan object
app.get("/show-object/:id", async (req, res) => {
  try {
    const object = await barang.findAll({ where: { id: req.params.id } });
    if (object.length > 0) {
      res.status(200).json({
        success: true,
        message: "object berhasil ditemukan",
        data: object,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Object tidak ditemukan",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// API get request untuk menampilkan list object
app.get("/show-object-list", async (req, res) => {
  try {
    const objects = await barang.findAll();
    if (objects.length > 0) {
      res.status(200).json({
        success: true,
        message: "Semua object berhasil ditemukan",
        data: objects,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data barang tidak ditemukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// server listening
const PORT = process.env.PORT || 6022;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
