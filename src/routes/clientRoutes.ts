"use strict";

import { Router } from "express";
import { getClient, sendData } from "../controllers/clientController.js";
import { checkToken } from "../middleware/checkToken.js";

const router = Router();

router.post("/get", checkToken, getClient);

router.patch("/send-data", checkToken, sendData);

export default router;
