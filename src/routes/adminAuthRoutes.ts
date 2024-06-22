"use strict";

import { Router } from "express";
import {
  adminLogin,
  adminRegister,
} from "../controllers/adminAuthControllers.js";

const router = Router();

router.post("/register", adminRegister);

router.post("/login", adminLogin);

export default router;
