const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

/* -------------------------------------------------------------------------- */
/*                                    Route                                   */
/* -------------------------------------------------------------------------- */

route.get("/", services.homeRoutes);
route.get("/add-user", services.add_user);
route.get("/update-user", services.update_user);

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------- CREATE USER ------------------------------ */
route.post("/api/users", controller.create);
/* -------------------------------- GET ALL USERS ------------------------------- */
route.get("/api/users", controller.find);
/* ----------------------------- GET USER BY ID ----------------------------- */
route.get("/api/users/:id", controller.findById);
/* ------------------------------- UPDATE USER ------------------------------ */
route.put("/api/users/:id", controller.update);
/* --------------------------------- DELETE USER --------------------------------- */
route.delete("/api/users/:id", controller.delete);

module.exports = route;
