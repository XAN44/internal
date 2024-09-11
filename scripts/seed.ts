const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.department.createMany({
      data: [
        { departname: "HR" },
        { departname: "Finance" },
        { departname: "Engineering" },
        { departname: "Marketing" },
        { departname: "Sales" },
        { departname: "Customer Support" },
        { departname: "Product Management" },
        { departname: "Design" },
        { departname: "Legal" },
        { departname: "IT" },
        { departname: "Research and Development" },
        { departname: "Operations" },
        { departname: "Public Relations" },
        { departname: "Supply Chain Management" },
        { departname: "Quality Assurance" },
        { departname: "Administration" },
        { departname: "Training and Development" },
        { departname: "Project Management" },
        { departname: "Business Intelligence" },
        { departname: "Digital Marketing" },
        { departname: "Data Science" },
        { departname: "Cybersecurity" },
        { departname: "Engineering Management" },
        { departname: "Compliance" },
        { departname: "Corporate Strategy" },
        { departname: "Investor Relations" },
        { departname: "Environmental Sustainability" },
        { departname: "Facilities Management" },
        { departname: "E-commerce" },
        { departname: "Content Creation" },
        { departname: "User Experience" },
        { departname: "Graphic Design" },
        { departname: "Event Management" },
        { departname: "Sales Enablement" },
        { departname: "Technical Support" },
        { departname: "Administrative Support" },
        { departname: "Legal Affairs" },
        { departname: "Training and Education" },
        { departname: "Market Research" },
        { departname: "Product Development" },
        { departname: "Innovation" },
        { departname: "Strategic Partnerships" },
        { departname: "Social Media Management" },
        { departname: "Customer Experience" },
        { departname: "Brand Management" },
        { departname: "Corporate Communications" },
        { departname: "Pricing Strategy" },
        { departname: "Procurement" },
        { departname: "Internal Audit" },
        { departname: "Client Services" },
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
