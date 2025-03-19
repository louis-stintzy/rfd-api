# Base stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
LABEL app="Reusable Form Demo API"
RUN addgroup -g 1598 rfdgroup && adduser -D -u 1599 -G rfdgroup rfduser
USER rfduser
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3302
CMD ["node", "dist/index.js"]
