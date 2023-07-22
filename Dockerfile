FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4040

EXPOSE 4040

CMD ["npm", "start"]