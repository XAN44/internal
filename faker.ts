import fs from "fs";
import { faker } from "@faker-js/faker";
import path from "path";

// ฟังก์ชันสำหรับสร้างข้อมูลวิดีโอ
const generateVideo = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  url: faker.internet.url(),
  type: "Video",
});

// ฟังก์ชันสำหรับสร้างข้อมูลควิซ
const generateQuiz = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  questions: Array.from({ length: 3 }, () => ({
    question: faker.lorem.sentence(),
    options: Array.from({ length: 4 }, () => faker.lorem.word()),
    correctAnswer: faker.lorem.word(),
  })),
  type: "Quiz",
});

// ฟังก์ชันสำหรับสร้างข้อมูลชั้นเรียน (chapter)
const generateChapter = () => {
  // สร้างลำดับของวิดีโอและควิซ
  const items = [
    generateVideo(), // เรียน 1
    generateVideo(), // เรียน 2
    generateQuiz(), // ควิซ 1
    generateVideo(), // เรียน 3
    generateVideo(), // เรียน 4
    generateQuiz(), // ควิซ 2
  ];

  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(),
    subChapter: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    items: items,
  };
};

// ฟังก์ชันสำหรับสร้างข้อมูลคอร์ส
const generateCourse = () => {
  return {
    id: faker.datatype.uuid(),
    category: faker.helpers.arrayElement(["Hard Skill", "Soft Skill"]),
    title: faker.commerce.productName(),
    name: faker.name.fullName(),
    role: faker.name.jobTitle(),
    thumnel: faker.image.imageUrl(),
    avatar: faker.image.avatar(),
    description: faker.lorem.paragraph(),
    progress: faker.datatype.number({ min: 0, max: 100 }),
    chapter: Array.from({ length: 4 }, generateChapter), // สร้าง 4 chapters
  };
};

// สร้างข้อมูลคอร์สจำลองจำนวน 12 ตัวอย่าง
const cardCourses = Array.from({ length: 12 }, generateCourse);

// บันทึกข้อมูลลงไฟล์
const filePath = path.resolve(__dirname, "fakeMe.ts");
fs.writeFileSync(
  filePath,
  `export const cardCourses = ${JSON.stringify(cardCourses, null, 2)};`,
  "utf8"
);

// แสดงข้อมูลที่สร้าง
console.log(JSON.stringify(cardCourses, null, 2));
