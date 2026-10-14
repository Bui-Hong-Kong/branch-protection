# Multi-stage: Vite build → nginx static server.
# Context: web/  (docker build -f Dockerfile .)

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Container serves at domain root (not GitHub Pages subpath).
ENV BASE_PATH=/
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
