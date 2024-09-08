# Usa una imagen base de Java
FROM openjdk:21-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR generado al contenedor
COPY target/Tenis-App.jar app.jar

# Expon el puerto en el que la aplicación se ejecutará
EXPOSE 8080

# Define el comando de inicio para la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
