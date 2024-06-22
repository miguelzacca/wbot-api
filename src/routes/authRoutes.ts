"use strict";

import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.post("/register", isAdmin, register);

router.post("/login", login);

export default router;
