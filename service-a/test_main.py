import main
import pytest


@pytest.mark.asyncio
async def test_tracing_headers():
    request_headers = [
        (b"x-request-id", b"X-Request-ID"),
        (b"x-b3-traceid", b"X-B3-TraceId"),
        (b"foo", b"bar")
    ]

    tracing_headers = await main.extract_tracing_headers(request_headers)
    assert len(tracing_headers) == 2
    assert "x-request-id" in str(tracing_headers)
    assert "X-Request-ID" in str(tracing_headers)
    assert "x-b3-traceid" in str(tracing_headers)
    assert "X-B3-TraceId" in str(tracing_headers)
