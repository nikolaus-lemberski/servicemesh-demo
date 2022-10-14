package com.lemberski.servicec;

import static io.javalin.http.HttpCode.INTERNAL_SERVER_ERROR;
import static java.lang.String.format;

import io.javalin.Javalin;

public final class App {

    private boolean crash = false;
    private int count = 0;

    public static void main(String[] args) {
        Environment env = new Environment();
        new App().startServer(env);
    }

    private void startServer(Environment env) {
        Javalin app = Javalin.create().start("0.0.0.0", env.port());

        app.get("/", ctx -> {
            if (crash) {
                ctx.status(INTERNAL_SERVER_ERROR);
                ctx.result(format("Error %d (Hostname: %s)", INTERNAL_SERVER_ERROR.getStatus(), env.hostname()));
                return;
            }

            count++;
            ctx.result(format("Service C | %s | %s | %d", env.version(), env.hostname(), count));
        });

        app.get("/health", ctx -> ctx.result("UP"));

        app.get("/crash", ctx -> {
            crash = true;
            ctx.result("Crash mode is activated. Call '/repair' to deactivate.");
        });

        app.get("/repair", ctx -> {
            crash = false;
            ctx.result("Crash mode is deactivated.");
        });
    }

}
