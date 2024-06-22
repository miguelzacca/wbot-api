"use strict";

import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";

export interface IController {
  (req: Request, res: Response);
}

export interface IUserModel extends Model {
  [key: string]: any;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction);
}
