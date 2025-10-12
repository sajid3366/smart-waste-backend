# Use Node 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy app source code
COPY . .

# Expose port
EXPOSE 5001

# Use environment variable PORT
CMD ["node", "src/server.js"]
