FROM maven:3.9.6-eclipse-temurin-17-alpine AS build-phase

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=build-phase /app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]