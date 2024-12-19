# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript project
RUN pnpm exec tsc

# Stage 2: Create a lightweight runtime image
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Copy other necessary files
COPY .env ./

# Expose the port and define the command
EXPOSE 3000
CMD ["node", "dist/index.js"]
