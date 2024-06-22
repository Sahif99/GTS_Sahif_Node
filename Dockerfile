
FROM node:22


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT 2468

EXPOSE 2468

CMD ["npm","start"]
