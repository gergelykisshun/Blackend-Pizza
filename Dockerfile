FROM node:17-alpine

WORKDIR /app

COPY . .

EXPOSE 9000
# required for docker desktop port mapping

CMD ["node", "./backend/server.js"]