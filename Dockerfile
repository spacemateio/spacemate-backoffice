# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy application code
COPY . .

# Remove the unncessary .env files
RUN rm -rf .env.local
RUN rm -rf .env.local.example
RUN rm -rf .env.development
RUN rm -rf .env.test
RUN rm -rf .env.production

ARG VITE_API_URL

# Copy environment variables file
RUN sh -c 'echo "VITE_API_URL=VITE_API_URL" > .env.production'

# Build the project
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
