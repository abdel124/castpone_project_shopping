FROM --platform=linux/amd64 node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./
RUN npm i --force
# Bundle app source
COPY . .
EXPOSE 8003
CMD [ "npm", "start"]