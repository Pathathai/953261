import { Request, Response } from "express";
import { users } from "../models/userModel";


function loginRoute(req: Request, res: Response) {
    const q = req.query.q;
    const error = q === "invalid"
        ? "Invalid credentials"
        : q === "need-login"
            ? "Please login first"
            : null;
    res.render("login", { error });
}

const loginPost = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) return res.redirect("/login?q=invalid");

  // create session after success
  req.session.userId = user.id;
  req.session.username = user.username;

  return res.redirect("/profile");
};

const logoutPost = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const profileRoute = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.session.userId);
  res.render("profile", { user });
};

export { loginRoute, loginPost, profileRoute, logoutPost };