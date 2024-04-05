ARG RELEASE_VERSION
FROM ghcr.io/torderdev/boilerplate-test/base:${RELEASE_VERSION} as development
ARG NODE_ENV=dev
ENV NODE_ENV=$NODE_ENV
WORKDIR /opt/app
RUN npm run build

FROM node:18.19.0-alpine3.18 as production
ARG NODE_ENV=prod
ENV NODE_ENV=$NODE_ENV
WORKDIR /opt/app
COPY package*.json ./
# tsconfig-paths 사용을 위해 필요
COPY tsconfig.json ./

COPY --from=development /opt/app/.npmrc /opt/app/.npmrc
COPY --from=development /opt/app/dist /opt/app/dist

RUN npm install --omit=dev

RUN rm /opt/app/.npmrc

CMD ["npm", "run", "start"]
