"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";
import config from "../config.js";
import { IController, IUserModel } from "../types/interfaces";
import { inputValidator } from "../utils.js";

export const register: IController = async (req, res) => {
  try {
    const { username, passwd } = inputValidator(req.body);

    const clientExists = await Client.findOne({ where: { username } });

    if (clientExists) {
      return res.status(409).json({ msg: config.authMsg.clientExists });
    }

    const salt = await bcrypt.genSalt(10);
    const passwdHash = await bcrypt.hash(passwd, salt);

    await Client.create({
      username,
      passwd: passwdHash,
    });

    res.status(201).json({ msg: config.clientMsg.created });
  } catch (err: any) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};

export const login: IController = async (req, res) => {
  try {
    const { username, passwd } = req.body;

    const client: IUserModel | null = await Client.findOne({
      where: { username },
    });

    if (!client) {
      return res.status(404).json({ msg: config.clientMsg.notFound });
    }

    const checkPasswd = bcrypt.compare(passwd, client.passwd);

    if (!checkPasswd) {
      return res.status(401).json({ msg: config.authMsg.incorrectPasswd });
    }

    const token = jwt.sign({ id: client.id }, config.env.SECRET, {
      expiresIn: config.env.AUTH_DURATION_DAYS * 24 * 60 * 60,
    });

    res.cookie("token", token, <object>config.cookie);

    res.status(200).redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
