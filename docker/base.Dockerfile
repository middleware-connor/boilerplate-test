FROM node:18.19.0-alpine3.18 as base
LABEL org.opencontainers.image.source="https://github.com/torderdev/boilerplate-test"
ARG GITHUB_TOKEN
RUN mkdir -p /opt/app
RUN echo "@torderdev:registry=https://npm.pkg.github.com/" > /opt/app/.npmrc \
  && echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> /opt/app/.npmrc

ARG NODE_ENV=dev
ENV NODE_ENV=$NODE_ENV
WORKDIR /opt/app
COPY . .
RUN npm install
RUN npm run ts-patch