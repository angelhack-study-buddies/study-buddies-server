import { AuthenticationError } from 'apollo-server-express'
import { Follow } from '../models/Follow'
import { PERMISSION_ERROR } from '../errorMessages'
import { Post } from '../models/Post'
import { Resolvers } from '../generated/graphql'
import { User } from '../models/User'
import differenceInDays from 'date-fns/differenceInDays'

const resolver: Resolvers = {
  User: {
    posts: async user => {
      return await user.getPosts()
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
    currentUser: (_, __, { currentUser }) => {
      return currentUser
    },

    recommendations: async (_, __, { currentUser }) => {
      const recentPosts = await Post.findAll({
        where: {
          authorID: currentUser.id,
          deltedAt: null,
        },
        order: [['createdAt', 'DESC']],
        limit: 5,
        include: [
          {
            association: Post.HashTags,
            as: 'hashtags',
            attributes: ['name'],
          },
        ],
      })
      const hashTags = []
      await Promise.all(
        recentPosts.map(async post => {
          // @ts-ignore
          const tags = post.hashtags
          tags.map(async tag => await (hashTags.indexOf(tag) === -1 ? hashTags.push(tag) : ''))
        }),
      )
      const posts = await Post.findAll({
        where: {
          hashTags: { in: hashTags },
        },
        order: ['likeCount'],
      })

      return { posts }
    },
  },
  Mutation: {
    follow: async (_, { followerID }, { currentUser }) => {
      if (!currentUser) {
        new AuthenticationError(PERMISSION_ERROR)
      }

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
