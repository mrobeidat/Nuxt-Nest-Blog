FROM node:21.7.0

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
RUN npm install -g pnpm
COPY ./package.json ./
RUN pnpm install
COPY . .
ENV PATH /opt/node_modules/.bin:$PATH
# WORKDIR /usr/src/backend/app
RUN pnpm build
EXPOSE 1337
CMD ["pnpm", "start"]
