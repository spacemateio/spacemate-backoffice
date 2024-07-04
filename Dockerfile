# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Copy environment variables file
COPY .env .env

# Build the project
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
