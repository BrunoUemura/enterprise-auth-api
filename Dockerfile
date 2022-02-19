FROM node:16-alpine
LABEL maintainer="Bruno Uemura"
WORKDIR /usr/app
COPY package*.json ./
COPY .env .
RUN npm install
COPY . .
RUN npm run build
RUN npm run postinstall
EXPOSE 5001
CMD ["npm", "start"]