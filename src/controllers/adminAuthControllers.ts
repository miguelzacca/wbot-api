"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { IController, IUserModel } from "../types/interfaces";
import { inputValidator } from "../utils.js";
import Admin from "../models/Admin.js";

export const adminRegister: IController = async (req, res) => {
  try {
    const { username, passwd, secret } = inputValidator(req.body);

    if (secret !== config.env.SECRET) {
      return res.sendStatus(403);
    }

    const salt = await bcrypt.genSalt(10);
    const passwdHash = await bcrypt.hash(passwd, salt);

    await Admin.create({
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

export const adminLogin: IController = async (req, res) => {
  try {
    const { username, passwd } = req.body;

    const admin: IUserModel | null = await Admin.findOne({
      where: { username },
    });

    if (!admin) {
      return res.status(404).json({ msg: config.clientMsg.notFound });
    }

    const checkPasswd = await bcrypt.compare(passwd, admin.passwd);

    if (!checkPasswd) {
      return res.status(401).json({ msg: config.authMsg.incorrectPasswd });
    }

    const token = jwt.sign({ username: admin.id }, config.env.SECRET, {
      expiresIn: config.env.AUTH_DURATION_DAYS * 24 * 60 * 60,
    });

    res.cookie("token", token, <object>config.cookie);

    res.status(200).redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.serverMsg.err });
  }
};
