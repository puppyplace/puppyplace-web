FROM node:latest as angular
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:latest
VOLUME /var/cache/nginx
COPY --from=angular ./dist/app-angular /usr/share/nginx/html
