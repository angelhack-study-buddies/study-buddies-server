import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from './models/User'
import { User as UserType } from './generated/graphql'
import passport from 'passport'

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

export const passportInitialize = () => {
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
}
