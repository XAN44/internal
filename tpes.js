// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//   try {
//     await database.Category.createMany({
//       data: [
//         {
//           name: "Programming",
//           description:
//             "Courses related to programming languages and techniques",
//         },
//         {
//           name: "Data Science",
//           description:
//             "Courses focusing on data analysis, statistics, and machine learning",
//         },
//         {
//           name: "Design",
//           description: "Courses on design principles and software",
//         },
//         {
//           name: "Business",
//           description:
//             "Courses on business management, strategy, and operations",
//         },
//         {
//           name: "Marketing",
//           description: "Courses related to marketing strategies and practices",
//         },
//         {
//           name: "Finance",
//           description:
//             "Courses covering financial management and investment strategies",
//         },
//         {
//           name: "Health",
//           description: "Courses related to health, wellness, and nutrition",
//         },
//         {
//           name: "Engineering",
//           description:
//             "Courses on various engineering disciplines and applications",
//         },
//         {
//           name: "Personal Development",
//           description:
//             "Courses focused on personal growth and skill development",
//         },
//         {
//           name: "Management",
//           description:
//             "Courses on project management, team management, and leadership",
//         },
//         {
//           name: "Cybersecurity",
//           description:
//             "Courses on protecting systems and networks from cyber threats",
//         },
//         {
//           name: "Artificial Intelligence",
//           description: "Courses related to AI concepts and technologies",
//         },
//         {
//           name: "Cloud Computing",
//           description: "Courses on cloud infrastructure and services",
//         },
//         {
//           name: "Data Analysis",
//           description: "Courses focused on analyzing and interpreting data",
//         },
//         {
//           name: "E-commerce",
//           description:
//             "Courses on online business and digital sales strategies",
//         },
//         {
//           name: "Creative Writing",
//           description: "Courses on writing fiction, non-fiction, and poetry",
//         },
//         {
//           name: "Graphic Design",
//           description: "Courses on visual design principles and tools",
//         },
//         {
//           name: "Photography",
//           description: "Courses on photography techniques and editing",
//         },
//         {
//           name: "Education",
//           description: "Courses on teaching methods and educational theories",
//         },
//         {
//           name: "Social Media",
//           description:
//             "Courses on managing and marketing through social media platforms",
//         },
//       ],
//     });
//     console.log("Success");
//   } catch (error) {
//     console.log("Error seeding the database", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();
