const { db } = require("./db");

const cors = require("cors");
const express = require("express");
const { services } = require("./services");

const app = express();

// middleware for json parsing
app.use(express.json());

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// middleware for allow cross origin request
app.use(cors());

app.use("/api", services);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server is running on :${port}`));
