const express = require("express");
const cors = require("cors");
const db = require("db-local");
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
  modelnumber: String,
});

const Service = Schema("Services", {
  name: { type: String, required: true },
  description: String,
  prices: Array,
  availability: Boolean,
  category: String,
  contractPeriodInDays: Number,
  discount: Boolean,
  discountAmount: Number,
  servicenumber: String,
});

/*- - - reading files - - -*/

/*
const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const services = JSON.parse(fs.readFileSync("./services.json", "utf-8"));
*/

/* - - - server - - - */

app.listen(port, ipAddr, () => {
  console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - -  v1

app.get("/products", (req, res) => {
  res.json(Product.find());
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

*/

/* - - - v2 - - -*/

app.get("/v2/products", (req, res) => {
  res.json(Product.find());
});

app.get("/v2/products/:id", (req, res) => {
  const id = req.params.id;

  const product = Product.findOne({ _id: `${id}` });

  if (!product) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(product);
  }
});

app.get("/v2/services", (req, res) => {
  res.json(Service.find());
});

app.get("/v2/services/:id", (req, res) => {
  const id = req.params.id;

  const service = Service.findOne({ _id: `${id}` });

  if (!service) {
    res.status(404).end("404 Not Found");
  } else {
    res.json(service);
  }
});

app.put("/v2/products/create", (req, res) => {
  const data = req.body;
  //const lowercaseName = data.name.toLowerCase();
  const existingProduct = Product.findOne({
    //name: lowercaseName,
    name: data.name,
    // modelnumber: data.modelnumber,
  });
  try {
    if (existingProduct) {
      res.status(400).send(`Product ${data.name} already exists.`);
    } else {
      Product.create({
        name: data.name,
        brand: data.brand,
        color: data.color,
        size: data.size,
        weight: data.weight,
        description: data.description,
        category: data.category,
        prices: data.prices,
        discounted: data.discounted,
        discountAmount: data.discountAmount,
        stock: data.stock,
        packagingSize: data.packagingSize,
        packagingWeight: data.packagingWeight,
        discontinued: data.discontinued,
        modelnumber: uniqid(),
      }).save();
      res.status(201).send(`Product ${data.name} was successfully created.`);
    }
  } catch (error) {
    res
      .status(500)
      .send(
        "An internal error occurred. Please try again or reach out to the admin."
      );
  }
});

app.put("/v2/services/create", (req, res) => {
  const data = req.body;

  try {
    const service = Service.findOne({ name: data.name });

    if (!service) {
      Service.create({
        name: data.name,
        description: data.description,
        prices: data.prices,
        availability: data.availability,
        category: data.category,
        contractPeriodInDays: data.contractPeriodInDays,
        discount: data.discount,
        discountAmount: data.discountAmount,
      }).save();

      res.status(201).send(`Service ${data.name} was successfully created.`);
    } else {
      res.status(400).send(`Service ${data.name} already exists.`);
    }
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reacht out to the admin."
      );
  }
});

app.put("/v2/products/update/:id", (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = Product.findOne({ _id: productId });

  try {
    if (!product) {
      res.status(404).send("404 Not Found");
    } else {
      console.log("if");
      Product.update({
        name: productData.name,
        brand: productData.brand,
        color: productData.color,
        size: productData.size,
        weight: productData.weight,
        description: productData.description,
        category: productData.category,
        prices: productData.prices,
        discounted: productData.discounted,
        discountAmount: productData.discountAmount,
        stock: productData.stock,
        packagingSize: productData.packagingSize,
        packagingWeight: productData.packagingWeight,
        discontinued: productData.discontinued,
      }).save();
    }
  } catch {
    console.log("else");
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reacht out to the admin."
      );
  }
});

app.put("/v2/services/update/:id", (req, res) => {
  const serviceId = req.params.id;
  const serviceData = req.body;

  const service = Service.findOne({ _id: serviceId });

  try {
    if (!service) {
      res.status(404).send("404 Not Found");
    } else {
      service
        .update({
          name: serviceData.name,
          description: serviceData.description,
          prices: serviceData.prices,
          availability: serviceData.availability,
          category: serviceData.category,
          contractPeriodInDays: serviceData.contractPeriodInDays,
          discount: serviceData.discount,
          discountAmount: serviceData.discountAmount,
        })
        .save();
    }
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reacht out to the admin."
      );
  }
});

app.get("*", (req, res) => {
  res.status(404).end("404 Not Found");
});

app.post("/v2/products/create/post", (req, res) => {
  const data = req.body;

  try {
    Product.create({
      name: data.name,
      brand: data.brand,
      color: data.color,
      size: data.size,
      weight: data.weight,
      description: data.description,
      category: data.category,
      prices: data.prices,
      discounted: data.discounted,
      discountAmount: data.discountAmount,
      stock: data.stock,
      packagingSize: data.packagingSize,
      packagingWeight: data.packagingWeight,
      discontinued: data.discontinued,
    }).save();

    res.status(201).send(`Product ${data.name} was successfully created.`);
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reach out to the admin."
      );
  }
});

app.post("/v2/services/create/post", (req, res) => {
  const data = req.body;

  try {
    Service.create({
      name: data.name,
      description: data.description,
      prices: data.prices,
      availability: data.availability,
      category: data.category,
      contractPeriodInDays: data.contractPeriodInDays,
      discount: data.discount,
      discountAmount: data.discountAmount,
    }).save();

    res.status(201).send(`Service ${data.name} was successfully created.`);
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reach out to the admin."
      );
  }
});

app.delete("/v2/products/delete/:id", (req, res) => {
  try {
    const productFound = Product.findOne({ _id: req.params.id });

    if (productFound) {
      productFound.remove();

      res
        .status(200)
        .send(`Product ${productFound.name} was deleted successfully`);
    } else {
      res.status(404).send("404 Not Found");
    }
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reach out to the admin"
      );
  }
});

app.delete("/v2/services/delete/:id", (req, res) => {
  try {
    const serviceFound = Product.findOne({ _id: req.params.id });

    if (serviceFound) {
      serviceFound.remove();

      res
        .status(200)
        .send(`Service ${serviceFound.name} was deleted successfully`);
    } else {
      res.status(404).send("404 Not Found");
    }
  } catch {
    res
      .status(500)
      .send(
        "An internal error occured. Please try again or reach out to the admin"
      );
  }
});

module.exports = app;
