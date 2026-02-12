import express from "express";
import { addTodo, getTodos } from "./services/todoService.js";
const app = express();
app.use(express.urlencoded({ extended: true })); // parse form data
app.get("/", (req, res) => {
    const todos = getTodos();
    const html = `
  <h1>Todo List</h1>
  <form action="/todos" method="POST">
    <input name="title" placeholder="New todo" />
    <button type="submit">Add</button>
  </form>
  <ul>
    ${todos.map((t) => `<li>${t.title}</li>`).join("")}
  </ul>`;
    res.send(html);
});
app.get("/todos", (req, res) => {
    const title = String(req.query.title ?? "");
    res.send(`Added todo: ${title}`);
});
app.post("/todos", (req, res) => {
    const title = String(req.body.title ?? "").trim();
    if (!title)
        return res.status(400).send("Title is required");
    // TODO: call addTodo() + saveTodos() from your service module
    addTodo(title);
    res.redirect("/");
});
console.log(process.cwd());
app.listen(3030, () => console.log("http://localhost:3030"));
//# sourceMappingURL=server.js.map