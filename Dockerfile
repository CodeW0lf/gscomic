ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS development-dependencies-env
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS production-dependencies-env
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build-env
COPY --from=development-dependencies-env /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --chown=node:node package.json package-lock.json ./
COPY --from=production-dependencies-env --chown=node:node /app/node_modules ./node_modules
COPY --from=build-env --chown=node:node /app/build ./build

USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
