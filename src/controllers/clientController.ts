"use strict";

import Client from "../models/Client.js";
import { IController, IUserModel } from "../types/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config.js";

export const getClient: IController = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = <JwtPayload>jwt.verify(token, config.env.SECRET);
    const id = decodedToken.id;

    const client = await Client.findOne({
      where: { id },
      attributes: { exclude: ["id", "passwd"] },
    });

    if (!client) {
      return res.status(404).json({ msg: config.clientMsg.notFound });
    }

    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
