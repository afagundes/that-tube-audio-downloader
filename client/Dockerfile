# BUILD
FROM node:17-alpine3.15 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production
FROM nginx:1.22

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
