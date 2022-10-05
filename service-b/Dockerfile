FROM denoland/deno:1.26.0

WORKDIR /app

COPY deps.ts main.ts routes.ts /app/
RUN deno cache deps.ts
RUN deno cache main.ts
RUN deno cache routes.ts

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "main.ts"]