const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

const ipAddr = "127.0.0.1";
const port = 8000;

let products;

/*- - - reading files - - -*/

fs.readFile("products.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  products = JSON.parse(data);
});

const services = JSON.parse(fs.readFileSync("./services.json", "utf-8"));

/* - - - server - - - */

app.listen(port, ipAddr, () => {
  console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  res.json(product);
});

app.get("/services", (req, res) => {
  res.set("Content-Type", "application/json");
  res.end(JSON.stringify(services));
});

app.get("/services/:pid", (req, res) => {
  res.set("Content-Type", "application/json");

  const pid = req.params.pid;

  let service;
  services.forEach((item) => {
    if (item.id == pid) service = item;
  });

  if (service) {
    res.end(JSON.stringify(service));
  } else {
    res.end(`service with id ${pid} not found.`);
  }
});
