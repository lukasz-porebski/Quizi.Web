FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

ARG API_URL

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/quizi/browser /usr/share/nginx/html

RUN apk add --no-cache gettext && \
    export API_URL="${API_URL}" && \
    export API_HOST=$(echo "$API_URL" | sed -e 's|^https\?://||' -e 's|/.*$||') && \
    envsubst '$API_URL $API_HOST' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
    apk del gettext

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
