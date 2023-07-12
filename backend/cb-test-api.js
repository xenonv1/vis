const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const ipAddr = "127.0.0.1";
const port = 8080;

app.listen(port, ipAddr, () => {
  console.log(`Now listening on ${ipAddr}:${port}...`);
});

app.get("/cb-test", (req, res) => {
  res.status(200).send({
    name: "Test Product",
    brand: "Test Brand",
    color: "Red",
    size: "L",
    weight: "1.5",
    description: "Test product description",
    category: "Test Category",
    prices: [
      {
        validFrom: "07.05.2020",
        validTo: "07.05.2021",
        price: "1385.68",
      },
    ],
    discounted: false,
    discountAmount: 0,
    stock: 10,
    packagingSize: "10x10x10",
    packagingWeight: "1.0",
    discontinued: false,
  });
});
