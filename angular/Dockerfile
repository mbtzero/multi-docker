FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install -g @angular/cli@7.3.9
RUN npm install
COPY . .
RUN ng build --output-path=build --prod

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

