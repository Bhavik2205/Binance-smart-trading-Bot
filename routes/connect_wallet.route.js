import express from "express";
import { newUser } from "../controllers/connect_wallet.controller.js";
import { Api_key } from "../middlewares/connect_walletValidate.js";

const router = express.Router();

router.post("/user/create", Api_key, newUser);

export default router;
