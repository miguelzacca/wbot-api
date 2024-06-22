"use strict";

import Client from "../models/Client.js";
import { IController, IUserModel } from "../types/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config.js";
import { z } from "zod";

export const getClient: IController = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = <JwtPayload>jwt.verify(token, config.env.SECRET);
    const id = decodedToken.id;

    const client = await Client.findOne({
      where: { id },
      attributes: { exclude: ["id", "passwd"] },
    });

    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const sendData: IController = async (req, res) => {
  const token = req.cookies?.token;

  const dataSchema = z.object({
    data: z.string().min(3),
  });

  try {
    const data = dataSchema.parse(req.body);

    const decodedToken = <JwtPayload>jwt.verify(token, config.env.SECRET);
    const id = decodedToken.id;

    const client: IUserModel | null = await Client.findOne({ where: { id } });

    if (!client) {
      return res.status(404).json({ msg: config.clientMsg.notFound });
    }

    client["data"] = data;
    await client.save();

    res.status(200).json({ msg: config.clientMsg.dataRecv });
  } catch (err: any) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
