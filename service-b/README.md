# Service B

Simple service with one downstream call, written in TypeScript / Deno.

Endpoints:

* "/"
* "/health"

## Develop

Install Deno runtime (`brew install deno` or use package manager of choice for your OS)

`deno run --allow-net --allow-env --watch main.ts`

In VSCode: Cmd-Shift-P > Deno: Initialize Workspace Configuration

### Unit tests

`deno test`

### Container image

Use provided Dockerfile to create a container image.