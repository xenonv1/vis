const express = require("express");
const fs = require("fs");

const app = express();

const ipAddr = "127.0.0.1";
const port = 8000;

const services = JSON.parse(fs.readFileSync("./services.json", "utf-8"));

/* - - - server - - - */

app.listen(port, ipAddr, () => {
  console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */

app.get("/services", (req, res) => {
  res.set("Content-Type", "application/json");
  res.end(JSON.stringify(services));
});

app.get("/service/:pid", (req, res) => {
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

/* - - - functions - - - */
