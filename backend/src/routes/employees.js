import express from "express";
import productsController from "../controllers/employeesController.js";

const router = express.Router();

router
  .route("/")
  .get(productsController.getEmployees)
  .post(productsController.insertEmployee);

router
  .route("/:id")
  .put(productsController.updateEmployee)
  .delete(productsController.deleteEmployee);

export default router;