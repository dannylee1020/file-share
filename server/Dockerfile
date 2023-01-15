FROM node:16.17-alpine3.16

WORKDIR /app
COPY . /app
RUN npm install && npm cache clean --force

CMD ["node", "server.js"]
EXPOSE 3000
