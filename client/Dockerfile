FROM --platform=linux/amd64 node:12 as build
## Build
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm i --force


# Bundle app source
COPY . .
#COPY build/ ./build
RUN npm run build
## Run 
FROM --platform=linux/amd64 nginx:alpine
#COPY www /usr/share/nginx/html
COPY --from=build  /app /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
