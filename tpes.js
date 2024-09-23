// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//   const categories = [
//     {
//       name: "Hard Skill",
//       description:
//         "Courses that focus on specific technical skills and knowledge.",
//     },
//     {
//       name: "Soft Skill",
//       description:
//         "Courses that develop interpersonal and communication skills.",
//     },
//     {
//       name: "Management",
//       description: "Courses that teach leadership and management principles.",
//     },
//     {
//       name: "Business",
//       description: "Courses focused on business strategies and operations.",
//     },
//     {
//       name: "Technology",
//       description: "Courses that cover technological advancements and tools.",
//     },
//     {
//       name: "Art",
//       description: "Courses that explore creativity and artistic expression.",
//     },
//     {
//       name: "Health & Wellness",
//       description: "Courses that promote physical and mental well-being.",
//     },
//     {
//       name: "Finance",
//       description:
//         "Courses that teach financial literacy and investment strategies.",
//     },
//     {
//       name: "Marketing",
//       description: "Courses focused on marketing strategies and techniques.",
//     },
//     {
//       name: "Data Science",
//       description: "Courses that cover data analysis and statistical methods.",
//     },
//     {
//       name: "Programming",
//       description:
//         "Courses that teach various programming languages and coding practices.",
//     },
//     {
//       name: "Writing",
//       description:
//         "Courses that improve writing skills for different contexts.",
//     },
//     {
//       name: "Communication",
//       description:
//         "Courses that enhance verbal and non-verbal communication skills.",
//     },
//     {
//       name: "Sales",
//       description:
//         "Courses that focus on sales techniques and customer relationship management.",
//     },
//     {
//       name: "Project Management",
//       description:
//         "Courses that cover project planning and execution strategies.",
//     },
//     {
//       name: "Entrepreneurship",
//       description: "Courses that inspire and teach entrepreneurship skills.",
//     },
//     {
//       name: "Public Speaking",
//       description:
//         "Courses that enhance public speaking and presentation skills.",
//     },
//     {
//       name: "Design",
//       description: "Courses that cover design principles and methodologies.",
//     },
//     {
//       name: "Research",
//       description:
//         "Courses that teach research methods and data collection techniques.",
//     },
//     {
//       name: "Networking",
//       description: "Courses that improve professional networking skills.",
//     },
//     {
//       name: "Customer Service",
//       description:
//         "Courses that focus on providing excellent customer support.",
//     },
//     {
//       name: "Digital Marketing",
//       description: "Courses that cover online marketing strategies and tools.",
//     },
//     {
//       name: "Cybersecurity",
//       description:
//         "Courses that teach how to protect systems and networks from threats.",
//     },
//   ];

//   try {
//     await database.Category.createMany({
//       data: categories,
//     });
//     console.log("Success: Categories added");
//   } catch (error) {
//     console.log("Error seeding the database", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();
