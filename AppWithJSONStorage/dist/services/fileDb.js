"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = getAllItems;
exports.addItem = addItem;
exports.getItem = getItem;
exports.getItemsByName = getItemsByName;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbFilePath = path_1.default.join(process.cwd(), "data", "items.json");
function getAllItems() {
    try {
        const data = fs_1.default.readFileSync(dbFilePath, "utf-8");
        const parsedData = JSON.parse(data);
        return parsedData.items;
    }
    catch (error) {
        console.error("Error reading items file:", error);
        return [];
    }
}
function addItem(item) {
    const items = getAllItems();
    items.push(item);
    const data = { items };
    try {
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
    }
    catch (error) {
        console.error("Error writing items file:", error);
    }
}
function getItem(id) {
    const items = getAllItems();
    return items.find(item => item.id === id);
}
function getItemsByName(name) {
    const items = getAllItems();
    return items.filter(item => item.name === name);
}
//# sourceMappingURL=fileDb.js.map