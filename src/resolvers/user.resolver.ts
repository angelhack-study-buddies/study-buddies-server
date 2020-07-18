import { Resolvers } from '../generated/graphql'
import { User } from '../models/User'
import { Post } from '../models/Post'

import differenceInDays from 'date-fns/differenceInDays'

const resolver: Resolvers = {
  User: {
    consecutiveStudyDays: async (user: User) => {
      const posts = await Post.findAll({
        where: {
          authorID: user.id,
        },
        order: [['created_at', 'DESC']],
      })

      if (!posts.length) return []

      const consecutiveStudyDays =
        posts.length &&
        posts.reduce((accDays: Date[], post) => {
          const previousDate = accDays[accDays.length - 1]
          if (!previousDate || differenceInDays(post?.createdAt, previousDate) <= 1) {
            accDays.push(post?.createdAt)
          }
          return accDays
        }, [])

      return consecutiveStudyDays
    },
  },
  Query: {
    user: async (_, { id }) => {
      return await User.findByPk(id)
    },
  },
}
export default resolver
