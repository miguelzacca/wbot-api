"use strict";

import { IMiddleware } from "../types/interfaces";
import config from "../config.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const isAdmin: IMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const decodedToken = <JwtPayload>jwt.verify(token, config.env.SECRET);
    const id = decodedToken.id;

    const admin = await Admin.findOne({ where: { id } });

    if (!admin) {
      return res.status(404).json({ msg: config.adminMsg.notFound });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: config.serverMsg.invalidToken });
  }
};
