import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtLibPayload } from "jsonwebtoken";
import { secretKey } from "../controllers/loginController";

type AppJwtPayload = JwtLibPayload & { userId: number; username: string; role?: string };

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;
  if (!token) return res.redirect("/login?q=missing-token");

  jwt.verify(token, secretKey, (err:any, decoded:any) => {
    if (err) return res.redirect("/login?q=invalid-token");

    req.user = decoded as AppJwtPayload; // now TS accepts because we augmented Request
    return next();
  });
}