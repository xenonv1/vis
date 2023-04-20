const express = require("express");
const fs = require("fs");
const cors = require("cors");
const db = require("db-local");

const app = express();

app.use(cors());

const ipAddr = "127.0.0.1";
const port = 8000;

const { Schema } = new db({ path: "./databases" });

const Product = Schema("Products", {
  name: { type: String, required: true },
  brand: String,
  color: String,
  size: String,
  weight: Number,
  description: String,
  category: String,
  prices: Array,
  discounted: Boolean,
  discountAmount: Number,
  stock: Number,
  packagingSize: String,
  packagingWeight: String,
  discontinued: Boolean,
});

const Service = Schema("Services", {
  name: { type: String, required: true },
  description: String,
  prices: [
    {
      validFrom: String,
      validTo: String,
      price: Number,
    },
  ],
  availability: Boolean,
  category: String,
  contractPeriodInDays: Number,
  discount: Boolean,
  discountAmount: Number,
});

/*- - - reading files - - -*/

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const services = JSON.parse(fs.readFileSync("./services.json", "utf-8"));

/* - - - server - - - */

app.listen(port, ipAddr, () => {
  console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - -  v1*/

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

/* - - - v2 - - -*/

app.get("/v2/products", (req, res) => {
  if (!products) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(products);
  }
});

app.get("/v2/products/:id", (req, res) => {
  const id = req.params.id;

  const product = products.find((p) => p.id == id);

  if (!product) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(product);
  }
});

app.get("/v2/services", (req, res) => {
  if (!services) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(services);
  }
});

app.get("/v2/services/:id", (req, res) => {
  const id = req.params.id;

  const service = services.find((s) => s.id == id);

  if (!service) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(service);
  }
});

app.get("*", (req, res) => {
  res.status(404).end("404 Not Found");
});
