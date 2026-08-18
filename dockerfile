FROM node:20-alpine

WORKDIR /app

COPY ./backendd .

RUN npm install

EXPOSE 3000  

CMD ["node", "server.js"]
