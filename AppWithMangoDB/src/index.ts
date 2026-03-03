import "dotenv/config";
import express from "express";
import path from "path";
import { getAllItems, addItem, getItem, getItemsByName } from "./services/itemDB";
import session from "express-session";
import MongoStore from "connect-mongo";
import { requireLogin } from "./middleware/authentication";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret_change_me",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,   // ✅ mongoUrl (correct)
      dbName: process.env.DB_NAME || "productDb",
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

const USERS = [
  { username: "admin", password: "1234" },
  { username: "user", password: "1234" },
];

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
      <input name="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req: any, res) => {
  const { username, password } = req.body;

  const found = USERS.find((u) => u.username === username && u.password === password);
  if (!found) return res.status(401).send("Invalid credentials");

  req.session.user = { username: found.username };
  res.redirect("/product");
});

app.post("/logout", (req: any, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});
app.get("/product", requireLogin, (req, res) => {
  res.send(`<h1>Product Page</h1>
    <p>Hello ${(req as any).session.user.username}</p>
    <form method="post" action="/logout"><button>Logout</button></form>
  `);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.get("/items", async (req, res) => {
  const items = await getAllItems();
  res.json(items);
});

app.get("/items/search", async (req, res) => {
  const name = String(req.query.name ?? "");
  const items = await getItemsByName(name);
  res.json(items);
});

app.get("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id format" });

  const item = await getItem(id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json(item);
});

app.post("/items", async (req, res) => {
  const id = await addItem(req.body);
  res.status(201).json({ message: "Item added successfully", id });
});

app.get("/debug/db", (req, res) => {
  const uri = process.env.MONGODB_URI ?? "";
  const dbName = process.env.DB_NAME ?? "";

  // Safely extract host (after @, before /)
  const host = uri.includes("@")
    ? (uri.split("@")[1]?.split("/")[0] ?? "(no host)")
    : "(no host)";

  res.json({ dbName, uriHost: host });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));