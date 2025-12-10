const studentJson =`[
  { "id": 1, "name": "Ann", "grade": 3.5 },
  { "id": 2, "name": "Bob", "grade": 2.7 },
  { "id": 3, "name": "Chen", "grade": 3.9 }
]`

type Student = {
  id: number;
  name: string;
  grade: number;
};

const students: Student[] = JSON.parse(studentJson);

function getTopStudents(students: Student[], minGrade: number): Student[] {
  return students.filter(student => student.grade >= minGrade);
}
console.log(getTopStudents(students, 3.0));