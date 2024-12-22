-- Contoh struktur tabel
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE grades (
    grade_id INT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(50),
    score INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Contoh query INNER JOIN
SELECT students.name, grades.subject, grades.score
FROM students
INNER JOIN grades
ON students.student_id = grades.student_id;