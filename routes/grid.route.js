import express from "express";
import { gridcreate } from "../controllers/price_grid.controller.js";

const router = express.Router();

router.post("/create", gridcreate);

export default router;
