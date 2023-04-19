const express = require("express");
const controller = require("./authControllers");

const authRouter = express.Router();

authRouter.post("/", controller.login);

module.exports = { authRouter };
