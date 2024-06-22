"use strict";

import { Router } from "express";
import { getClient } from "../controllers/clientController.js";
import { checkToken } from "../middleware/checkToken.js";

const router = Router();

router.post("/get", checkToken, getClient);

export default router;
