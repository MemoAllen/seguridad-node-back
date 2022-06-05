import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keysScripts from "../config/keysScripts";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, keysScripts.keys.secret);
    res.locals.jwtPayload = jwtPayload;

    const { iat, exp, ...newUser } = jwtPayload;
    const newToken = jwt.sign(newUser, keysScripts.keys.secret, {
      expiresIn: "1h",
    });
    res.setHeader("auth", newToken);
    next();
  } catch (error) {
    return res.status(401).json({ message: "no autorizado" });
  }
};
