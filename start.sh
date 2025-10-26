#!/bin/sh
# Zamienia zmienne środowiskowe w plikach konfiguracyjnych Nginx
envsubst '$API_URL $PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Uruchamia Nginx w foreground
exec nginx -g 'daemon off;'
