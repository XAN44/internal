const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  const departments = [
    { departname: "HR" },
    { departname: "Finance" },
    { departname: "Marketing" },
    { departname: "Sales" },
    { departname: "IT" },
    { departname: "Operations" },
    { departname: "Customer Service" },
    { departname: "Research and Development" },
    { departname: "Legal" },
    { departname: "Supply Chain" },
    { departname: "Product Management" },
    { departname: "Business Development" },
    { departname: "Project Management" },
    { departname: "Public Relations" },
    { departname: "Quality Assurance" },
    { departname: "Training and Development" },
    { departname: "Data Analysis" },
    { departname: "Content Creation" },
    { departname: "Graphic Design" },
    { departname: "Social Media" },
    { departname: "Administration" },
    { departname: "Facilities Management" },
    { departname: "Security" },
    { departname: "Corporate Communications" },
    { departname: "Compliance" },
    { departname: "Risk Management" },
    { departname: "Information Technology Support" },
    { departname: "Engineering" },
    { departname: "Technical Support" },
    { departname: "Inventory Management" },
    { departname: "Event Planning" },
    { departname: "Investor Relations" },
    { departname: "Policy Development" },
    { departname: "Community Engagement" },
  ];

  try {
    await database.department.createMany({
      data: departments,
    });
    console.log("Success: Departments added");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
