import express from "express";
import path from "path";
import { getAllItems, addItem, getItem, getItemsByName } from './services/fileDb';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// Get index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// List items
app.get("/items", (req, res) => {
  const items = getAllItems();
  res.json(items);
});

// Search by name
app.get("/items/search", (req, res) => {
  const name = req.query.name as string;
  const items = getItemsByName(name);
   // if (items.length === 0) return res.status(404).json({ message: "Item not found" });
  return res.json(items);
  //res.render("itemsList", { title:"Items List", items: items });
});

// Get item by id
app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = getItem(id);

  if (!item) return res.status(404).json({ message: "Item not found" });
  return res.json(item);
});

// Add item
app.post("/items", (req, res) => {
  const newItem = req.body;
  addItem(newItem);
  res.status(201).json({ message: "Item added successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});