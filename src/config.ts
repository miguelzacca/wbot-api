"use strict";

import { config } from "dotenv";

config();

const { NODE_ENV, PORT, HOST, SECRET, AUTH_DURATION_DAYS } = process.env;

export default {
  env: {
    PORT: Number(PORT),
    HOST: <string>HOST,
    SECRET: <string>SECRET,
    AUTH_DURATION_DAYS: Number(AUTH_DURATION_DAYS),
  },

  cors: {
    origin: [<string>HOST],
    methods: ["GET", "POST"],
    credentials: true,
  },

  cookie: {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: Number(AUTH_DURATION_DAYS) * 24 * 60 * 60 * 1000,
    sameSite: "None",
  },

  authMsg: {
    ok: "Authentication success.",
    clientExists: "This username already existence.",
    incorrectPasswd: "Incorrect password.",
  },

  clientMsg: {
    created: "User created successfully.",
    notFound: "User not found.",
    dataRecv: "Data received successfully.",
  },

  adminMsg: {
    notFound: "Admin not found.",
  },

  serverMsg: {
    err: "A server occurred error. Please try later.",
    invalidToken: "Invalid token",
  },
};
