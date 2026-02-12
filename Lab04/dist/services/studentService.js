import fs from "fs";
import path from "path";
const dataPath = path.join(process.cwd(), "src", "data", "students.json");
export function loadStudents() {
    const text = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(text);
}
export function saveStudents(students) {
    fs.writeFileSync(dataPath, JSON.stringify(students, null, 2), "utf-8");
}
export function addStudent(students, name, major) {
    const nextId = students.length === 0 ? 1 : Math.max(...students.map(s => s.id)) + 1;
    const newStudent = { id: nextId, name, major };
    return [...students, newStudent];
}
//# sourceMappingURL=studentService.js.map