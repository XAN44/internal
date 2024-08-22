import { elysia } from "../../../../elysia/client";

async function page() {
  const { data, error } = await elysia.api.message1.message1.get();
  console.log(data);

  return <div className="w-full">{data?.name}</div>;
}

export default page;
