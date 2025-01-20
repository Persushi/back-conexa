# Build stage
FROM node:20.18.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20.18.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE $API_PORT

# Start the application
CMD ["npm", "run", "start:prod"]