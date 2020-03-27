### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-dev
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx-dev.conf /etc/nginx/nginx.conf
COPY key.pem /etc/nginx/
COPY cert.pem /etc/nginx/
COPY --from=build /usr/src/app/dist/pwa /usr/share/nginx/html
