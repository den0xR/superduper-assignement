FROM node:22.17-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN apk add --no-cache bash
EXPOSE 3000
CMD ["/bin/sh", "-c", "npm run init-dev && npm run build"]