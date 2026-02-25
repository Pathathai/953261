import { Request, Response } from "express";
import { users } from "../models/userModel";
import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // use env in real apps

function showLogin(req:Request, res:Response) {
  const q = req.query.q;

  const error =
    q === "invalid" ? "Invalid credentials" :
    q === "missing-token" ? "Please login first" :
    q === "token-expired" ? "Session expired, please login again" :
    null;

  res.render("login", { error });
}

function login(req:Request, res:Response) {
  const { username, password } = req.body;
console.log("Login attempt:", username, password);
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) return res.redirect("/login?q=invalid");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    secretKey,
    { expiresIn: "1h" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
    // secure: true, // enable in HTTPS
  });

  return res.redirect("/product");
}

function logout(req:Request, res:Response) {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    // secure: true,
  });
  return res.redirect("/");
}

function showProduct(req:Request, res:Response) {
  res.render("product", { user: req.user});
}

export { showLogin, login, logout, secretKey, showProduct };