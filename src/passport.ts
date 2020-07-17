import passport from 'passport'

import { User } from './models/User'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_BASE_URL } from './config'

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${SERVER_BASE_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOrCreate({
        where: { id: profile.id },
        defaults: { name: profile.displayName, id: profile.id, email: profile._json.email },
      })

      done(null, user[0])
    } catch (error) {
      done(error)
    }
  },
)

export const passportInitialize = () => {
  passport.use('google', googleStrategy)

  passport.serializeUser((user, done) => {
    // @ts-ignore
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

  return passport
}
