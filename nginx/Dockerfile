FROM node:12 as react

WORKDIR /app

COPY ./react-app /app/

RUN npm install

RUN npm run build



FROM nginx

COPY --from=react /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/nginx.conf

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]