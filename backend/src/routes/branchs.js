import express from "express";
import branchsController from "../controllers/branchsControllers.js";

const router = express.Router();

router
  .route("/")
  .get(branchsController.getBranches)
  .post(branchsController.insertBranch);

router
  .route("/:id")
  .put(branchsController.updateBranch)
  .delete(branchsController.deleteBranch);

export default router;