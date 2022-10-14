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

async function index(req_headers: Headers): Promise<Response> {
    const headers = extractTracingHeaders(req_headers);
    const service_c_host = Deno.env.get("SERVICE_C_HOST") || "service-c:8080";

    const text = await fetch(`http://${service_c_host}`, {headers})
        .then((res) => handleErrors(res))
        .then((res) => res.text())
        .catch((err) =>
            err instanceof TypeError ? (err as TypeError).message : err
        );

    return new Response(`Service B <- ${text}`, {status: 200});
}

function health(): Response {
    return new Response("UP", {status: 200});
}

function notFound(): Response {
    return new Response("Page not found", {status: 404});
}

async function handleErrors(response: Response): Promise<Response> {
    if (!response.ok) {
        const text = await response.text();
        throw Error(text || response.statusText);
    }
    return response;
}

function extractTracingHeaders(req_headers: Headers): string[][] {
    const tracing_headers: string[] = [
        "x-request-id",
        "x-b3-traceid",
        "x-b3-spanid",
        "x-b3-parentspanid",
        "x-b3-sampled",
        "x-b3-flags",
    ];

    const headers: string[][] = tracing_headers
        .filter((tracing_header) => req_headers.get(tracing_header) != null)
        .map((tracing_header) => [tracing_header, req_headers.get(tracing_header)])
        .filter((arr): arr is string[] => arr != null);

    return headers;
}

export {handler, extractTracingHeaders};
