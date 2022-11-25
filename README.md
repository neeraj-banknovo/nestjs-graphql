
# Description

NestJs boilerplate using GraphQl code-first approach

#### Setting config

```bash
# Run the below command to set the config and replace the template values with your config values
$ cp .env.sample .env
```

#### Setting Husky

```bash
# Run this command to setup & prepare husky
$ npm run prepare
```

#### Installation

```bash
$ npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### See your app in action

 - [http://localhost:PORT/graphql](http://localhost:PORT/graphql)


#### Generate Migration based on entities

```bash
# Generate Migration based on Migration Scripts, give your migrations a name using --name flag (optional)
$ npm run migration:generate --name=<migration-name>

# create Migration based on Migration Scripts, give your migrations a name using --name flag (optional)
$ npm run migration:create --name=<migration-name>

# Run Migration based on Migration Scripts
$ npm run migration:run
```

#### Linting

```bash
# Linting with Eslint
$ npm run lint
```

#### Application [compodoc](https://compodoc.app/)
Run the below command and visit [here](http://127.0.0.1:8001/)
```bash
# This command will generate the application documentation.
npx @compodoc/compodoc -p tsconfig.json -s -r 8001
```

#### Stay in touch

- Author - [Neeraj Soni](neeraj@novo.co)


