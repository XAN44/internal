const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.Category.createMany({
      data: [
        {
          name: "Hard Skill",
          description:
            "Skills directly related to a specific job or task, such as programming, engineering, or graphic design.",
        },
        {
          name: "Soft Skill",
          description:
            "Interpersonal skills such as communication, teamwork, and problem-solving that are essential for personal and professional success.",
        },
        {
          name: "Business",
          description:
            "Skills and knowledge related to managing and running a business, including strategy, operations, and finance.",
        },
        {
          name: "Technology",
          description:
            "Skills related to the use of technology and software, including IT support, cybersecurity, and digital tools.",
        },
        {
          name: "Design",
          description:
            "Creative skills involved in designing visual content, including graphic design, user experience, and product design.",
        },
        {
          name: "Marketing",
          description:
            "Skills related to promoting and selling products or services, including digital marketing, market research, and advertising.",
        },
        {
          name: "Finance",
          description:
            "Knowledge and skills related to managing money, investments, and financial planning.",
        },
        {
          name: "Health & Wellness",
          description:
            "Skills and knowledge related to physical and mental well-being, including fitness, nutrition, and stress management.",
        },
        {
          name: "Language",
          description:
            "Skills related to learning and using different languages, including speaking, writing, and understanding foreign languages.",
        },
        {
          name: "Personal Development",
          description:
            "Skills and activities aimed at improving personal growth, including self-awareness, time management, and goal setting.",
        },
        {
          name: "Art & Creativity",
          description:
            "Creative skills and activities related to various forms of art, including painting, music, writing, and performing arts.",
        },
        {
          name: "Leadership",
          description:
            "Skills related to leading and managing teams, including decision-making, strategic planning, and motivation.",
        },
        {
          name: "Data Science",
          description:
            "Skills related to analyzing and interpreting complex data, including statistics, machine learning, and data visualization.",
        },
        {
          name: "Project Management",
          description:
            "Skills related to planning, executing, and closing projects, including resource management, scheduling, and risk assessment.",
        },
        {
          name: "Engineering",
          description:
            "Technical skills related to designing and building systems, structures, and machines, including mechanical, electrical, and civil engineering.",
        },
        {
          name: "Sales",
          description:
            "Skills related to selling products or services, including customer relations, negotiation, and sales strategies.",
        },
        {
          name: "Human Resources",
          description:
            "Skills related to managing employee relations, including recruitment, training, and performance management.",
        },
        {
          name: "Communication",
          description:
            "Skills related to effectively conveying information and interacting with others, including writing, speaking, and active listening.",
        },
        {
          name: "Software Development",
          description:
            "Skills related to creating, testing, and maintaining software applications, including programming, debugging, and software engineering.",
        },
        {
          name: "Cybersecurity",
          description:
            "Skills related to protecting systems and data from security threats, including risk assessment, encryption, and network security.",
        },
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
