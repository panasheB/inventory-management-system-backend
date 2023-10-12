# pull official base image
FROM node:13.12.0-alpine
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=8192"
COPY package.json ./
RUN npm install
EXPOSE 3001
COPY . .
CMD ["npm", "start"]
