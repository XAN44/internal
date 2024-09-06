const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Hard Skill" },
        { name: "Soft Skill" },
        { name: "Business" },
        { name: "Technology" },
        { name: "Design" },
        { name: "Marketing" },
        { name: "Finance" },
        { name: "Health & Wellness" },
        { name: "Language" },
        { name: "Personal Development" },
        { name: "Art & Creativity" },
        { name: "Leadership" },
        { name: "Data Science" },
        { name: "Project Management" },
        { name: "Engineering" },
        { name: "Sales" },
        { name: "Human Resources" },
        { name: "Communication" },
        { name: "Software Development" },
        { name: "Cybersecurity" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
