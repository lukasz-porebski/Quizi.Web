#!/bin/sh
set -e

echo "Generating Nginx config with:"
echo "  API_URL=$API_URL"
echo "  PORT=$PORT"

envsubst '$API_URL $PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Final Nginx config:"
cat /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
