package com.lemberski.servicec;

public class Environment {

    private static final String PORT = System.getenv().getOrDefault("PORT", "8080");
    private static final String HOSTNAME = System.getenv().getOrDefault("HOSTNAME", "localhost");
    private static final String VERSION = System.getenv().getOrDefault("VERSION", "v1");

    Integer port() {
        return Integer.parseInt(PORT);
    }

    String hostname() {
        String dash = "-";
        if (HOSTNAME.contains(dash)) {
            return HOSTNAME.substring(HOSTNAME.lastIndexOf(dash) + 1);
        }

        return HOSTNAME;
    }

    String version() {
        return VERSION;
    }

}
