FROM node:18.16
WORKDIR /app
COPY package.json .
ADD . .
RUN npm install
EXPOSE 54232
CMD ["npm", "run", "serve"]