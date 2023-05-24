FROM node:latest AS build
WORKDIR /app

COPY client/. .
RUN npm ci && npm run build --omit="dev"

FROM nginx:alpine
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/client /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
