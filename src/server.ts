import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config'

import { ApolloServer } from 'apollo-server-express'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from './models/User'
import compression from 'compression'
import cors from 'cors'
import { createServer } from 'http'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import passport from 'passport'
import schema from './schema'
import { sequelize } from './models'

interface GoogleUser {
  id: string
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ id: profile.name }, function (err, user) {
    //   return done(err, user)
    // })
    console.log('done~~', done)
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

  passport.serializeUser(function (user: GoogleUser, done) {
    done(null, user.id)
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

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (
    req,
    res,
  ) {
    res.redirect('/')
  })

  server.applyMiddleware({ app, path: '/graphql' })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void =>
    console.log(`\n🔥GraphQL is running on http://localhost:3000/graphql`),
  )
}

run()
