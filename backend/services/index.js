const express = require("express");

const { authRouter } = require("./auth/routes");
const { userRouter } = require("./users/routes");

const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRouter);

module.exports = { services };
