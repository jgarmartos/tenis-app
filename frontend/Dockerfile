# Usar una imagen base de Node.js para construir el proyecto
FROM node:20 as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install && npm run build

# Usar una imagen base de Nginx para servir los archivos
FROM nginx:stable-alpine

# Copiar los archivos estáticos generados al contenedor
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto que Nginx utiliza
EXPOSE 3000

# Define el comando de inicio para Nginx
CMD ["nginx", "-g", "daemon off;"]
