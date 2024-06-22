"use strict";

import { IMiddleware } from "../types/interfaces";
import config from "../config.js";
import jwt from "jsonwebtoken";

export const checkToken: IMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    jwt.verify(token, config.env.SECRET);
    next();
  } catch (err) {
    res.status(401).json({ msg: config.serverMsg.invalidToken });
  }
};
