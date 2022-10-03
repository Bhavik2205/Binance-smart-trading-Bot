import express from "express";
import {
  createStrategy,
  deleteStrategy,
  modifyStrategy,
} from "../controllers/strategy.controller.js";

const router = express.Router();

router.post("/create", createStrategy);
router.patch("/modify", modifyStrategy);
router.delete("/delete", deleteStrategy);

export default router;
