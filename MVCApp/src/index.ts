import express from "express";
import path from "path";
import { listItems, searchItems, getItemById, createItem } from './controllers/itemController';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("views", path.join(process.cwd(), "src","views"));
app.set("view engine", "ejs");



// Routes (wiring) – keep it here for now
//app.get("/", (req, res) => res.render("home"));
app.get("/items", listItems);
app.get("/search", searchItems);
app.get("/items/:id", getItemById);
app.post("/items", createItem);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});