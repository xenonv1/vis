const fs = require("fs");
const db = require("db-local");

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

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const services = JSON.parse(fs.readFileSync("./services.json", "utf-8"));

products.forEach((p) => {
  Product.create({
    name: p.name,
    brand: p.brand,
    color: p.color,
    size: p.size,
    weight: p.weight,
    description: p.description,
    category: p.category,
    prices: p.prices,
    discounted: p.discounted,
    discountAmount: p.discountAmount,
    stock: p.stock,
    packagingSize: p.packaginSize,
    packagingWeight: p.packagingWeight,
    discontinue: p.discontinued,
    modelnumber: p.modelnumber,
  }).save();
});

services.forEach((s) => {
  Service.create({
    name: s.name,
    description: s.description,
    prices: s.prices,
    availability: s.availability,
    category: s.category,
    contractPeriodInDays: s.contractPeriodInDays,
    discount: s.discount,
    discountAmount: s.discountAmount,
    servicenumber: s.servicenumber,
  }).save();
});
