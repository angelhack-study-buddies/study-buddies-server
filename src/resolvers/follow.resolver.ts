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
}
export default resolver
