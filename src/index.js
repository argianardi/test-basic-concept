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

//----------------------------- No 1------------------------
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

//----------------------------- No 3------------------------
const barang = require("./configs/models/barang");

// post request
app.post("/create-object", (req, res) => {
  const { nama_barang, harga, stock } = req.body;

  if (!(nama_barang && harga && stock)) {
    return res.status(400).json({
      success: false,
      message: "Data belum lengkap",
    });
  }

  try {
    const dataBarang = barang.create({
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

// server listening
const PORT = process.env.PORT || 6022;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
