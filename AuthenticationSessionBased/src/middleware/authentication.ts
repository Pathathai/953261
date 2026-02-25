import type { Request, Response, NextFunction } from "express";


// --- Middleware: protect pages ---
function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) return res.redirect("/login?q=need-login");
  next();
}

export { requireLogin };