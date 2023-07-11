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
  res.status(200).send("ok");
});
