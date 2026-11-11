# Same as Dockerfile.ci — Node 22 SPA + Express BFF for deploy
FROM node:22-alpine AS web-build
WORKDIR /web
COPY web/package.json web/package-lock.json* ./
RUN npm install
COPY web/ ./
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
ENV PORT=8079
WORKDIR /usr/src/app

COPY package.json yarn.lock* package-lock.json* ./
RUN npm install --omit=dev

COPY . .
COPY --from=web-build /web/dist ./web/dist

RUN addgroup -S mygroup && adduser -S -G mygroup myuser \
  && chown -R myuser:mygroup /usr/src/app
USER myuser

EXPOSE 8079
CMD ["npm", "start"]
