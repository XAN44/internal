import React from "react";
import GetCategory from "../../components/createCourse/getCategory/mainCategory";
import { db } from "../../lib/db";

async function page() {
  const data = await db.category.findMany();

  // จัดเรียงข้อมูลตามชื่อในลำดับ A-Z
  const sortedData = data.sort((a, b) => {
    const nameA = a.name.toLowerCase(); // เปลี่ยนเป็นตัวพิมพ์เล็กเพื่อเปรียบเทียบ
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1; // nameA มาก่อน nameB
    if (nameA > nameB) return 1; // nameA มาหลัง nameB
    return 0; // เท่ากัน
  });
  return (
    <>
      <GetCategory category={sortedData} />
    </>
  );
}

export default page;
