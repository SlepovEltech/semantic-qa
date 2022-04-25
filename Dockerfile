FROM node:16-alpine
WORKDIR /usr/app/front
EXPOSE 3000
COPY ./ ./
RUN npm install
CMD ["npm", "run", "serve"]


