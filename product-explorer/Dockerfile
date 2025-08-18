# Etapa 1: Construir la aplicación de Angular
FROM node:22.18.0 AS build
WORKDIR /product-explorer
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine
COPY --from=build /product-explorer/dist/product-explorer/browser/ /usr/share/nginx/html/
# Copia el archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
