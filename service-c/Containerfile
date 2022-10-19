# Build
FROM registry.access.redhat.com/ubi8/openjdk-11 as builder

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
COPY src src

RUN ./mvnw -B package

# Run
FROM registry.access.redhat.com/ubi8/openjdk-11-runtime

COPY --from=builder /home/jboss/target/service-c-1.0-SNAPSHOT-jar-with-dependencies.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "service-c-1.0-SNAPSHOT-jar-with-dependencies.jar"]