FROM node:12 
ENV PORT 4300
ENV DB_URL mongo:27017/MasterLinux
ENV NODE_ENV production
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://localhost:${PORT}/ || exit 1
ENTRYPOINT ["npx", "pm2-runtime", "start", "deploy.json"]

