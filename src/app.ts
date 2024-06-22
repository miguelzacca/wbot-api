"use strict";

import cors from "cors";
import express from "express";
import config from "./config.js";
import db from "./db/sequelize.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", clientRoutes);
app.use("/auth/admin", adminAuthRoutes);

db.sync()
  .then(() => {
    const PORT = config.env.PORT;
    app.listen(PORT, () => {
      console.log(`Running... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
