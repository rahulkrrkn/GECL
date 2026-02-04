# ================================
# Build stage
# ================================
FROM node:alpine AS build

WORKDIR /app

# Fix npm network issues (timeouts, retries, registry)
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Copy package files
COPY package.json package-lock.json ./

# Use npm ci (faster + reliable)
RUN npm ci

# Copy source
COPY . .

# Build Next.js app
RUN npm run build


# ================================
# Runtime stage
# ================================
FROM node:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only required runtime files
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./

# Next.js default port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]