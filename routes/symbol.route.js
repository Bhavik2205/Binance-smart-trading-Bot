import express from "express";
import { adminMiddleware, requireSignin } from "../admin/admin-middleware.js";
import {
  createSymbol,
  deleteSymbol,
  modifySymbol,
} from "../controllers/symbol.controller.js";
import Symbol_logo from "../middlewares/symbol_icon.handeler.js";

const router = express.Router();

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  Symbol_logo,
  createSymbol
);
router.patch(
  "/modify",
  requireSignin,
  adminMiddleware,
  Symbol_logo,
  modifySymbol
);
router.delete(
  "/delete",
  requireSignin,
  adminMiddleware,
  Symbol_logo,
  deleteSymbol
);

export default router;
