const express = require("express");
var jwt = require("express-jwt");

const config = require("./../../db.config");

const controller = require("./usersController");

const userRouter = express.Router();

userRouter.get("/", controller.find);

userRouter.get("/:userId", jwt(config), controller.get);

userRouter.post("/", controller.create);

userRouter.patch("/:userId", jwt(config), controller.patch);

module.exports = { userRouter };
