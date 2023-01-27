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

// Routes
app.get("/fibonaci", (req, res) => {
  const { jumlahAngka } = req.body;

  if (jumlahAngka <= 1) {
    return n;
  }

  const result = [0, 1];

  for (let i = 2; i <= jumlahAngka + 2; i++) {
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

// server listening
const PORT = process.env.PORT || 6022;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
