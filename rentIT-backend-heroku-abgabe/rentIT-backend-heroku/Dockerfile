#define base docker image
FROM openjdk:11
RUN apt-get update && apt-get install -y postgresql-client awscli
LABEL maintainer="javaguides.net"
ADD target/rent-it-0.1.jar springboot-docker-rentit.jar
ENTRYPOINT ["java", "-jar", "springboot-docker-rentit.jar"]
EXPOSE 3000

# Set environment variables for PostgreSQL connection
ENV DATABASE_URL=jdbc:postgresql://sohemots-rds-db.c96k0yusqp38.us-east-1.rds.amazonaws.com:5432/sohemots-rds-db
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=Daniel19980s.
