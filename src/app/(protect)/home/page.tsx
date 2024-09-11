import CardCouse from "../../components/home/cardCourse";
import { db } from "../../lib/db";

async function page() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      course: {
        select: {
          id: true,
          title: true,
          imageURL: true,
          isPublished: true,
          descriptions: true,
          User: {
            select: {
              username: true,
              image: true,
              role: true,
            },
          },
        },
      },
    },
  });

  const filteredCategories = categories.map((category) => ({
    ...category,
    course: category.course.filter((course) => course.isPublished),
  }));

  return (
    <div
      className="
        w-full
      ">
      <CardCouse category={filteredCategories} />
    </div>
  );
}

export default page;
