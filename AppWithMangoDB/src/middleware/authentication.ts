import type { Request, Response, NextFunction } from "express";


// --- Middleware: protect pages ---
function requireLogin(req: any, res: any, next: any) {
  if (!req.session.user) return res.redirect("/login?error=1");
  next();
}

export { requireLogin };