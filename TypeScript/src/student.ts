// const studentJson =`[
//   { "id": 1, "name": "Ann", "grade": 3.5 },
//   { "id": 2, "name": "Bob", "grade": 2.7 },
//   { "id": 3, "name": "Chen", "grade": 3.9 }
// ]`

// type Student = {
//   id: number;
//   name: string;
//   grade: number;
// };

// const students: Student[] = JSON.parse(studentJson);

// function getTopStudents(students: Student[], minGrade: number): Student[] {
//   return students.filter(student => student.grade >= minGrade);
// }
// console.log(getTopStudents(students, 3.0));

//const fs = require("fs");
import * as fs from "fs";

type Student = {
  id: number;
  name: string;
  grade: number;
  isActive: boolean;
};

const raw = fs.readFileSync("data/students.json", "utf-8");
const students: Student[] = JSON.parse(raw);

const topStudents = students.filter((s) => s.grade >= 3.0);
console.log("Top students:", topStudents);

const topJson = JSON.stringify(topStudents, null, 2);
fs.writeFileSync("data/top-students.json", topJson);

console.log("top-students.json written!");
