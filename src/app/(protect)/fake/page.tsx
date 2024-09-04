import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../lib/auth/auth";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return <div>{session?.user.email}</div>;
}

export default page;
