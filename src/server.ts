import compression from 'compression'
import cors from 'cors'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import passport from 'passport'
import { ApolloServer } from 'apollo-server-express'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { createServer } from 'http'

import schema from './schema'
import { sequelize } from './models'
import { User } from './models/User'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config'
import { User as UserType } from './generated/graphql'

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOrCreate({
        where: { id: profile.id },
        defaults: { name: profile.displayName, id: profile.id, email: profile._json.email },
      })
      done(undefined, user)
    } catch (error) {
      done(error)
    }
  },
)

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
  passport.use('google', googleStrategy)

  passport.serializeUser(function (user: UserType, done) {
    done(null, user)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findByPk(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

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
