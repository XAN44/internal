import fs from "fs";
import { faker } from "@faker-js/faker";
import path from "path";

// ฟังก์ชันสำหรับสร้างข้อมูลชั้นเรียน (chapter)
const generateChapter = () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(),
    subChapter: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    url: faker.internet.url(), // เพิ่ม url ของ chapter
    type: "Chapter", // กำหนด type เป็น "Chapter"
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
