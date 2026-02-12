import { loadStudents, saveStudents, addStudent } from "./services/studentService.js";
const students = loadStudents();
const updated = addStudent(students, "Mina", "UX");
saveStudents(updated);
console.log("Updated students:", updated);
//# sourceMappingURL=test-student.js.map