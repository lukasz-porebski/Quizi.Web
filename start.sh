#!/bin/sh
set -e

export API_HOST=$(echo "$API_URL" | sed -e 's|^https\?://||' -e 's|/.*$||')
envsubst '$API_URL $PORT $API_HOST' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'