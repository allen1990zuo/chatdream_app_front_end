FROM node:16-slim as builder
WORKDIR /app
COPY client ./
RUN npm install
RUN npm run build

# Use Nginx to serve the build app
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

