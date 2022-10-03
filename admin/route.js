import express from "express";
import { signup, signin, signout } from "./auth.js";
import {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} from "./validators.js";
//import { requireSignin } from "../../common-middleware";

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signout", signout);

export default router;
