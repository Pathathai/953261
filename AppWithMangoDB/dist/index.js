"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const itemDB_1 = require("./services/itemDB");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "index.html"));
});
app.get("/items", async (req, res) => {
    const items = await (0, itemDB_1.getAllItems)();
    res.json(items);
});
app.get("/items/search", async (req, res) => {
    const name = String(req.query.name ?? "");
    const items = await (0, itemDB_1.getItemsByName)(name);
    res.json(items);
});
app.get("/items/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "Invalid id format" });
    const item = await (0, itemDB_1.getItem)(id);
    if (!item)
        return res.status(404).json({ message: "Item not found" });
    res.json(item);
});
app.post("/items", async (req, res) => {
    const id = await (0, itemDB_1.addItem)(req.body);
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
//# sourceMappingURL=index.js.map