export function getTodos() {
    return [
        { id: 1, title: "Learn TypeScript", completed: false },
        { id: 2, title: "Build a Todo App", completed: true },
    ];
}
export function addTodo(title) {
    // In a real app, you'd save to a database
    console.log(`Added todo: ${title}`);
}
//# sourceMappingURL=todoService.js.map