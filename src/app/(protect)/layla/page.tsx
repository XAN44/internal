import { elysia } from "@/elysia/client";

async function fetchData() {
  try {
    console.log("Fetching data...");
    const response = await elysia.api.message.test1.get();
    console.log("Data received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function Page() {
  const data = await fetchData();
  console.log("Page data:", data);

  return (
    <div className="w-full">
      {data ? <p>{data.name}</p> : <p>Error loading data.</p>}
    </div>
  );
}
