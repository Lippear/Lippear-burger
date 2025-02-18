const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/menu", (req, res) => {
  const filePath = path.join(__dirname, "menu.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(JSON.parse(data));
  });
});

app.post("/api/order", (req, res) => {
  const userData = req.body;
  console.log(userData);
  res.json({ message: "Your request has been received successfully" });
});

app.listen(3500, () => console.log("Server running on port 3500"));
