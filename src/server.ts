import compression from 'compression'
import cors from 'cors'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import passport from 'passport'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import schema from './schema'
import { sequelize } from './models'
import { passportInitialize } from './passport'
import {
  CLIENT_BASE_URL,
  COOKIE_SECRET,
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
} from './config'

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

  passportInitialize()

  const MysqlSessionStore = new MySQLStore(session)
  app.use(
    session({
      store: new MysqlSessionStore({
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        port: Number(MYSQL_PORT),
      }),
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        domain: CLIENT_BASE_URL,
        secure: true,
      },
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect(CLIENT_BASE_URL)
    },
  )

  server.applyMiddleware({ app, path: '/graphql' })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void =>
    console.log(`\n🔥GraphQL is running on http://localhost:3000/graphql`),
  )
}

run()
