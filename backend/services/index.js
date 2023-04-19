const express = require("express");

const { authRouter } = require("./auth/authRoutes");
const { userRouter } = require("./users/usersRoutes");

// console.log("testing", authRouter, userRouter)

const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRouter);

module.exports = { services };
