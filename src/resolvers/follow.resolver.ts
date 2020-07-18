import { AuthenticationError } from 'apollo-server-express'

import { PERMISSION_ERROR } from '../errorMessages'
import { Resolvers } from '../generated/graphql'
import { Follow } from '../models/Follow'

const resolver: Resolvers = {
  Follow: {
    follower: async follow => {
      return await follow.getFollower()
    },
    followingUser: async follow => {
      return await follow.getFollowingUser()
    },
  },
  Mutation: {
    follow: async (_, { followingUserID }, { currentUser }) => {
      if (!currentUser) {
        new AuthenticationError(PERMISSION_ERROR)
      }

      const followOption = {
        followingUserID,
        followerID: currentUser.id,
      }

      const follow = await Follow.findOne({ where: followOption })

      if (!follow) {
        const follow = await Follow.create(followOption)
        return !!follow
      }

      await follow.destroy()
      return false
    },
  },
}
export default resolver
