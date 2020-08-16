FROM nginx
EXPOSE 80
COPY web-build/ /usr/share/nginx/html
