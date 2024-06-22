"use strict";

import db from "../db/sequelize.js";
import { STRING, INTEGER } from "sequelize";

const Admin = db.define(
  "Admim",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: STRING(50),
      unique: true,
      allowNull: false,
    },

    passwd: {
      type: STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Admin;
