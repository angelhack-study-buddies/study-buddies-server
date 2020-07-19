import compression from 'compression'
import cors from 'cors'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import schema from './schema'
import { sequelizeInit } from './models'
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
  const sequelize = await sequelizeInit()

  process.on('SIGINT', async () => {
    try {
      await sequelize.close()
      process.exit(0)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

  const app = express()

  app.use(compression())
  app.use(cookieParser())

  const CORSOption = { origin: true, credentials: true }
  app.use(cors(CORSOption))
  // @ts-ignore
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
      },
    }),
  )

  const passport = passportInitialize()

  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/', function (req, res) {
    res.send(req.user)
  })

  app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect(encodeURI(CLIENT_BASE_URL))
    },
  )
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {})
    res.redirect(encodeURI(CLIENT_BASE_URL))
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ currentUser: req.user }),
    validationRules: [depthLimit(7)],
    introspection: true,
    playground: true,
  })

  server.applyMiddleware({ app, path: '/graphql', cors: { origin: true, credentials: true } })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void =>
    console.log(`\n🔥GraphQL is running on http://localhost:3000/graphql`),
  )
}

run()
