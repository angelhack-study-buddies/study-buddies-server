import { Op } from 'sequelize'
import { AuthenticationError } from 'apollo-server-express'
import { Follow } from '../models/Follow'
import { PERMISSION_ERROR } from '../errorMessages'
import { Post } from '../models/Post'
import { Resolvers } from '../generated/graphql'
import { User } from '../models/User'
import { HashTag } from '../models/HashTag'

const resolver: Resolvers = {
  User: {
    posts: async (user, { orderBy, limit }) => {
      return await Post.findAll({
        where: { authorID: user.id },
        order: [[orderBy?.field || 'likeCount', orderBy?.direction || 'DESC']],
        limit: limit || 10,
      })
    },
    followers: async user => {
      return await user.getFollowers()
    },
    followings: async user => {
      return await user.getFollowings()
    },
    consecutiveStudyDays: async user => {
      const posts = await Post.findAll({
        where: { authorID: user.id },
        order: [['created_at', 'DESC']],
      })

      if (!posts?.length) return []

      const consecutiveStudyDays =
        posts.length &&
        posts.reduce((accDays: Date[], post) => {
          const previousDate = accDays[accDays.length - 1]
          if (!previousDate || previousDate?.getDate() - post.createdAt?.getDate() === 1) {
            accDays.push(post?.createdAt)
          }
          return accDays
        }, [])

      return consecutiveStudyDays
    },
    recommendations: async (_, { limit }, { currentUser }) => {
      const recentPosts = await Post.findAll({
        where: {
          authorID: currentUser?.id,
          deletedAt: null,
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

      const hashTagNames: string[] = []
      recentPosts.forEach(post => {
        // @ts-ignore
        post.hashtags.forEach((tag: HashTag) => {
          if (hashTagNames.indexOf(tag.name) === -1) {
            hashTagNames.push(tag.name)
          }
        })
      })

      const likeClause = hashTagNames?.map(tagName => ({ [Op.like]: `%${tagName}%` }))
      const likeOptions = { [Op.or]: likeClause }

      const posts = await Post.findAll({
        where: { authorID: { [Op.ne]: currentUser?.id }, deletedAt: null },
        include: [
          {
            association: Post.HashTags,
            as: 'hashtags',
            attributes: ['name'],
            where: { name: likeOptions },
          },
        ],
        limit: limit || 10,
        order: [['likeCount', 'DESC']],
      })

      return posts
    },
  },
  Query: {
    user: async (_, { id }) => {
      return await User.findByPk(id)
    },
    currentUser: (_, __, { currentUser }) => {
      return currentUser
    },
  },
  Mutation: {
    // follow: async (_, { followingID }, { currentUser }) => {
    follow: async (_, { followingID }) => {
      // if (!currentUser) {
      //   new AuthenticationError(PERMISSION_ERROR)
      // }
      const currentUser = await User.findByPk('111509060843271067545')

      const followOption = {
        followingID,
        followerID: currentUser?.id,
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
