import express from "express";
import { gridcreate } from "../controllers/price_grid.controller.js";
import {
  gridValidate,
  margin_call_size,
} from "../middlewares/grid.handeler.js";

const router = express.Router();

router.post("/create", margin_call_size, gridValidate, gridcreate);

export default router;
