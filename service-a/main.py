import os
import httpx

port = int(os.environ.get("PORT", default=8080))
service_b_host = os.environ.get("SERVICE_B_HOST", default="service-b:8080")


async def app(scope, receive, send):
    assert scope["type"] == "http"

    match scope["path"]:
        case "/":
            text, status = await index(scope["headers"])
        case "/health":
            text, status = await health()
        case _:
            text, status = await page_not_found()

    response_headers = [(b"content-type", b"text/plain; charset=utf-8")]
    await send({"type": "http.response.start", "status": status, "headers": response_headers})
    await send({"type": "http.response.body", "body": text.encode("UTF-8")})


async def index(request_headers):
    try:
        tracing_headers = await extract_tracing_headers(request_headers)
        async with httpx.AsyncClient() as client:
            request = await client.get(f"http://{service_b_host}", headers=tracing_headers)
        text = request.text
    except Exception as e:
        text = f"Service B | {e}"

    return f"Service A <- {text}\n", 200


async def health():
    return "UP", 200


async def page_not_found():
    return "Page not found", 404


async def extract_tracing_headers(request_headers):
    tracing_headers = [
        "x-request-id",
        "x-b3-traceid",
        "x-b3-spanid",
        "x-b3-parentspanid",
        "x-b3-sampled",
        "x-b3-flags"
    ]

    headers = {
        k.decode("UTF-8"): v.decode("UTF-8")
        for (k, v) in request_headers if k.decode("UTF-8") in tracing_headers
    }

    return headers


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port, proxy_headers=True, server_header=False, access_log=False)
