FROM node:16-slim

RUN mkdir -p /srv
WORKDIR /srv
ADD . .
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
