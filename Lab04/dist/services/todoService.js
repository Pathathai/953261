import fs from "fs";
import path from "path";
const dataPath = path.join(process.cwd(), "src", "data", "todos.json");
export function loadTodos() {
    const text = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(text);
}
export function saveTodos(todos) {
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2), "utf-8");
}
export function addTodo(todos, title, done) {
    const nextId = todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1;
    const newTodo = { id: nextId, title, done };
    return [...todos, newTodo];
}
//# sourceMappingURL=todoService.js.map