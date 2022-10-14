import {extractTracingHeaders} from "./handler.ts";
import {
    assertEquals,
    assertStringIncludes,
} from "https://deno.land/std@0.158.0/testing/asserts.ts";

Deno.test("test extract tracing headers", () => {
    const expected1: string[] = ["x-request-id", "X-Request-ID"];
    const expected2: string[] = ["x-b3-traceid", "X-B3-TraceId"];

    const headers: Headers = new Headers();
    headers.append(expected1[0], expected1[1]);
    headers.append(expected2[0], expected2[1]);
    headers.append("foo", "bar");

    const tracing_headers = extractTracingHeaders(headers);
    assertEquals(2, tracing_headers.length);
    assertStringIncludes(tracing_headers.toString(), expected1[0]);
    assertStringIncludes(tracing_headers.toString(), expected1[1]);
    assertStringIncludes(tracing_headers.toString(), expected2[0]);
    assertStringIncludes(tracing_headers.toString(), expected1[1]);
});
