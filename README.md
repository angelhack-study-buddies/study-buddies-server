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
