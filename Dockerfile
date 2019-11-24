FROM node:12

USER root

WORKDIR /usr/src/app

COPY ["package.json", ".npmrc", "./"]
RUN npm install --production

COPY . .

RUN npm run clean-alias-link
RUN npm run alias-link

EXPOSE 8080

CMD ["npm", "start"]