FROM denoland/deno:1.26.1

WORKDIR /app

COPY deps.ts main.ts handler.ts /app/
RUN deno cache deps.ts
RUN deno cache main.ts
RUN deno cache handler.ts

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "main.ts"]