import express from "express";
import { newUser } from "../controllers/connect_wallet.controller.js";

const router = express.Router();

router.post("/create", newUser);

export default router;
