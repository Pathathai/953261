"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentJson = `[
  { "id": 1, "name": "Ann", "grade": 3.5 },
  { "id": 2, "name": "Bob", "grade": 2.7 },
  { "id": 3, "name": "Chen", "grade": 3.9 }
]`;
const students = JSON.parse(studentJson);
function getTopStudents(students, minGrade) {
    return students.filter(student => student.grade >= minGrade);
}
console.log(getTopStudents(students, 3.0));
//# sourceMappingURL=student.js.map