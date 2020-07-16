import compression from 'compression'
import cors from 'cors'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import passport from 'passport'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import schema from './schema'
import { sequelize } from './models'
import { passportInitialize } from './passport'

async function run() {
  sequelize.sync()
  const app = express()

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    playground: true,
  })

  app.options('*', cors())
  app.use(compression())

  // passport config
  passportInitialize()

  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/', (req, res) => {
    res.json({ user: req.user })
  })
  app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    },
  )

  server.applyMiddleware({ app, path: '/graphql' })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void =>
    console.log(`\n🔥GraphQL is running on http://localhost:3000/graphql`),
  )
}

run()
