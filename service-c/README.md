# Service C

Simple service with crash simulation, written in Java 11 and Javalin Micro Framework.

Endpoints:

* "/"
* "/health"
* "/crash"
* "/repair"

## Develop

Open in your IDE and run *App.java*. Or build the project with Maven and run the jar file.

```bash
./mvnw clean package  
java -jar target/service-c-1.0-SNAPSHOT-jar-with-dependencies.jar
```

### Container image

Use provided Dockerfile to create a container image.