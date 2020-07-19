FROM node:12-alpine
WORKDIR /app
ENV SERVER_BASE_URL=https://master-study-buddies-server-angelhack-study-buddies.endpoint.dev.ainize.ai
COPY package*.json yarn.lock ./
COPY . .
RUN yarn --production --frozen-lockfile
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
