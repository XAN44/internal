import type { Elysia } from "elysia";

const api = (app: Elysia) => app.get("/", () => "hello api");

export default api;
