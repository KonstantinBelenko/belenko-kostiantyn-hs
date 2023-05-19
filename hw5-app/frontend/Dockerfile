# ---- Build Stage ----
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for utilising Docker cache 
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the application
RUN npm run build


# ---- Run Stage ----
FROM nginx:1.21

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/public .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
