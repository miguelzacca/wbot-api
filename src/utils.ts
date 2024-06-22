"use strict";

import { z } from "zod";

const authSchema = z.object({
  username: z.string().min(3).max(50),
  passwd: z.string().min(6).max(16),
});

export const inputValidator = (input: object) => {
  try {
    return authSchema.parse(input);
  } catch (err) {
    throw { zod: err };
  }
};
