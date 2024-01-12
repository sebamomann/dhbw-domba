# Stage 1: Build the React application
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN npm run build
RUN ls

## STAGE 2
FROM nginx:1.25.3-alpine

#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/www /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]