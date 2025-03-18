import express from "express";
import evaluationsController from "../controllers/evaluationsControllers.js";

const router = express.Router();

router
  .route("/")
  .get(evaluationsController.getEvaluations)
  .post(evaluationsController.insertEvaluation);

router
  .route("/:id")
  .put(evaluationsController.updateEvaluation)
  .delete(evaluationsController.deleteEvaluation);

export default router;
