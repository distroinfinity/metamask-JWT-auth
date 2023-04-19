const express = require("express");
const controller = require("./controllers");

const authRouter = express.Router();

authRouter.post("/", controller.login);

module.exports = { authRouter };
