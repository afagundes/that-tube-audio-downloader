FROM node:17-alpine3.15

RUN apk add ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]
