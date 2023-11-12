# Utilise l'image Node.js LTS comme base
FROM node:19

COPY ./package*.json ./

RUN npm cache clean --force
RUN npm install

EXPOSE 3000

CMD ["npm","run", "dev","--","--host","0.0.0.0"]