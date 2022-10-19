import main
import pytest


@pytest.mark.asyncio
async def test_tracing_headers():
    request_headers = [
        (b"x-request-id", b"myRequestId"),
        (b"x-b3-traceid", b"myTraceId"),
        (b"foo", b"bar")
    ]

    tracing_headers = await main.extract_tracing_headers(request_headers)
    assert len(tracing_headers) == 2
    assert "x-request-id" in str(tracing_headers)
    assert "myRequestId" in str(tracing_headers)
    assert "x-b3-traceid" in str(tracing_headers)
    assert "myTraceId" in str(tracing_headers)
