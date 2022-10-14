import {serve} from "./deps.ts";
import {handler} from "./handler.ts";

const port = parseInt(Deno.env.get("PORT") || "8080");

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);
await serve(handler, {port});
