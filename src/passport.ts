import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from './models/User'
import passport from 'passport'

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

interface GoogleUser {
  id: string
}

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

passport.use('google', googleStrategy)
