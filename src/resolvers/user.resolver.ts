import { Op } from 'sequelize'
import { Resolvers } from '../generated/graphql'
import { User } from '../models/User'
import { Post } from '../models/Post'
import { Follow } from '../models/Follow'
import differenceInDays from 'date-fns/differenceInDays'

const resolver: Resolvers = {
  User: {
    posts: async user => {
      return await user.getPosts()
      // return await Post.findAll({
      //   include: [
      //     {
      //       model: User,
      //       as: 'author',
      //       where: { id: { [Op.in]: user?.id } },
      //     },
      //   ],
      // })
    },
    followers: async user => {
      return await user.getFollowers()
    },
    followings: async user => {
      return await user.getFollowings()
    },
    consecutiveStudyDays: async user => {
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
    userIsLoggedIn: async (_, __, { currentUser }) => {
      return !!currentUser
    },
  },
  Mutation: {
    // follow: async (_, { followingUserID }, { currentUser }) => {
    follow: async (_, { followerID }) => {
      // if (!currentUser) {
      //   new AuthenticationError(PERMISSION_ERROR)
      // }

      const currentUser = await User.findByPk('111509060843271067545')

      const followOption = {
        followingID: currentUser?.id,
        followerID,
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
