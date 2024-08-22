// elysia/client.ts

import type { TElysiaApp } from "@/elysia";
import { treaty } from "@elysiajs/eden";

// If you are not using Next.js v15^, you may want to set revalidate value to 0 due to default caching mechanics.
const url = process.env.URL_DOMAIN ?? "localhost:3000";

export const elysia = treaty<TElysiaApp>(url, {
  fetch: {
    next: { revalidate: 0 },
  },
});

// export const elysia = treaty<TElysiaApp>(url);
