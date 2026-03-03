import "dotenv/config";
import express from "express";
import path from "path";
import { getAllItems, addItem, getItem, getItemsByName } from "./services/itemDB";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

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