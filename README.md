# Study-Buddies-Server

## Run

- run: `yarn dev`
- playground: `http://localhost:3000/graphql`
- lint: `yarn lint`
- test: `yarn test`

## Linting

- VScode extensions: `ESLint`, `Prettier - Code formatter`
- VScode setting: `formatOnSave: true`

## Environment Variables

- add `.env` file to project root
- add variables to `.env`

```
MY_NAME=STUDY_BUDDIES
```

- add variables to `config.ts` and use this

```
export const MY_NAME = process.env.MY_NAME
```

## Connect DB

Use local database until migrated.
Don't forget to sync your mysql setting and env vars in `config.ts`

- run mysql image: `docker run -d -p 9876:3306 -e MYSQL_ROOT_PASSWORD={password} mysql:5.7`
- check containerID: `docker ps -a`
- connect to docker container: `docker exec -it {containerID} sh`
- connect to mysql: `mysql -u root -p`. password is above
- create db: `CREATE DATABASE studybuddies;`
- sync the db and sequelize model: `yarn dev` (`sequelize.sync` in server.ts automatically creates tables to db)
