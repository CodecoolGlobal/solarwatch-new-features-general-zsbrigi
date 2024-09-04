# Stage 1
FROM node:18-alpine AS builder

WORKDIR /vite-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /vite-app/dist /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]