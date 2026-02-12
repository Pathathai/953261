import fs from "fs";
import path from "path";
import type { Todo } from "../models/todo.ts";
import type { Student } from "../models/student.ts";


const dataPath = path.join(process.cwd(), "src", "data", "todos.json");

export function loadTodos(): Todo[] {
  const text = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(text) as Todo[];
}

export function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2), "utf-8");
}

export function addTodo(todos: Todo[], title: string, done: boolean): Todo[] {
  const nextId = todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1;
  const newTodo: Todo = { id: nextId, title, done };
  return [...todos, newTodo];
}