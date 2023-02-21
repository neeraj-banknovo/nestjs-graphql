FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock docker-entrypoint.sh ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# build application
RUN yarn build

# remove development dependencies
RUN yarn install --prod --frozen-lockfile

# prune unnecessary files from the node_modules folder
RUN yarn autoclean --force

FROM node:18-alpine

WORKDIR /usr/src/app

# copy from builder
COPY --from=builder /usr/src/app ./

EXPOSE 3005

RUN chmod +x docker-entrypoint.sh

RUN sh docker-entrypoint.sh

CMD [ "npm", "run", "start:dev" ]
# CMD [ "node", "dist/src/main" ]