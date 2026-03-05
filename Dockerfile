# ---------------------------------------------------------
# 1) Build Stage — uses Node to build React (Vite) project
# ---------------------------------------------------------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build project
RUN npm run build


# ---------------------------------------------------------
# 2) Production Stage — serve build with Nginx
# ---------------------------------------------------------
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default nginx config (optional)
# You can skip this if you want default Nginx behavior
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

