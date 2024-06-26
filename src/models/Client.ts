"use strict";

import db from "../db/sequelize.js";
import { UUID, UUIDV4, STRING, TEXT } from "sequelize";

const Client = db.define(
  "Client",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
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

    data: {
      type: TEXT,
      defaultValue: "NULL",
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Client;
