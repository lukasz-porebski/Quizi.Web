#!/bin/sh
set -e

echo "Generating Nginx config with:"
echo "  API_URL=$API_URL"
echo "  PORT=$PORT"

# Extract hostname from API_URL
export API_HOST=$(echo "$API_URL" | sed -e 's|^https\?://||' -e 's|/.*$||')
echo "  API_HOST=$API_HOST"

envsubst '$API_URL $PORT $API_HOST' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Final Nginx config:"
cat /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
