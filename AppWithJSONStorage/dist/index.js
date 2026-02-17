"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fileDb_1 = require("./services/fileDb");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
// Get index.html
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "index.html"));
});
// List items
app.get("/items", (req, res) => {
    const items = (0, fileDb_1.getAllItems)();
    res.json(items);
});
// Search by name
app.get("/items/search", (req, res) => {
    const name = req.query.name;
    const items = (0, fileDb_1.getItemsByName)(name);
    // if (items.length === 0) return res.status(404).json({ message: "Item not found" });
    return res.json(items);
    //res.render("itemsList", { title:"Items List", items: items });
});
// Get item by id
app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = (0, fileDb_1.getItem)(id);
    if (!item)
        return res.status(404).json({ message: "Item not found" });
    return res.json(item);
});
// Add item
app.post("/items", (req, res) => {
    const newItem = req.body;
    (0, fileDb_1.addItem)(newItem);
    res.status(201).json({ message: "Item added successfully" });
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map