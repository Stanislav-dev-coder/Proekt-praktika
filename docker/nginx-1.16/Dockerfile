FROM nginx:1.16-alpine
LABEL Description="NGINX container for Yii2 PHP-FPM web entrypoints"

COPY ./etc/errorpages.conf /etc/nginx/errorpages.conf
COPY ./etc/nginx.conf /etc/nginx/nginx.conf

COPY ./html /usr/share/nginx/html
COPY ./html-errorpages /usr/share/nginx/html-errorpages

COPY ./nginx-entrypoint.sh /nginx-entrypoint.sh
RUN chmod +x /nginx-entrypoint.sh
ENTRYPOINT ["/nginx-entrypoint.sh"]

WORKDIR "/usr/share/nginx/html"

CMD ["nginx"]
