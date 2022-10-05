import { serve } from "./deps.ts";
import { health, index, notFound } from "./routes.ts";

const port = parseInt(Deno.env.get("PORT") || "8080");

async function handler(request: Request): Promise<Response> {
  switch (new URL(request.url).pathname) {
    case "/":
      return await index(request.headers);

    case "/health":
      return health();

    default:
      return notFound();
  }
}

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);
await serve(handler, { port });
