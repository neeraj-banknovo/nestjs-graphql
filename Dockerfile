FROM node:18-alpine AS BUILD_STAGE

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Copying migration executable
COPY migrate.sh ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# lint & test
RUN yarn lint

# build application
RUN yarn build

# remove development dependencies
RUN yarn install --prod --frozen-lockfile

# prune unnecessary files from the node_modules folder
RUN yarn autoclean --force

FROM node:18-alpine

WORKDIR /usr/src/app

# copy from BUILD_STAGE
COPY --from=BUILD_STAGE /usr/src/app/dist ./dist
COPY --from=BUILD_STAGE /usr/src/app/node_modules ./node_modules

EXPOSE 3005

CMD [ "node", "dist/src/main" ]