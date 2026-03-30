FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./

ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    echo "@lukasz-porebski:registry=https://npm.pkg.github.com" >> .npmrc && \
    npm ci && \
    rm .npmrc

COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/quizi/browser /usr/share/nginx/html

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
