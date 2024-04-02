FROM node:18-alpine

WORKDIR /home/service-xml-cte

COPY package*.json ./

COPY . .

RUN npm cache clear --force

RUN npm ci

RUN npm run build

EXPOSE 7012

CMD ["npm" , "run", "start:prod"]


