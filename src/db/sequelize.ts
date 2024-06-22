"use strict";

import { Sequelize } from "sequelize";

const db = new Sequelize({
  storage: "./src/db/database.db",
  dialect: "sqlite",
  logging: false,
});

export default db;
