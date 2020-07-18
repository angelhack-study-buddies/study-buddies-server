import { PostOrderField, Resolvers } from '../generated/graphql'

import { Op } from 'sequelize'
import { Post } from '../models/Post'
import { User } from '../models/User'

const resolverMap: Resolvers = {
  Post: {
    // TODO: title, content, previewImage resolver 추가
    author: async (post: Post) => {
      return await post.getAuthor()
    },
    hashTags: async (post: Post) => {
      return await post.getHashTags()
    },
  },
  Query: {
    post: async (_, { id }): Promise<Post> => {
      return await Post.findByPk(id)
    },
    postGetMany: async (_, { input }) => {
      const { filterBy, orderBy } = input

      let orderField
      if (orderBy?.field === PostOrderField.LikeCount) {
        orderField = 'like_count'
      }
      if (orderBy?.field === PostOrderField.CreatedAt) {
        orderField = 'created_at'
      }

      let group
      if (filterBy.authorIDs.length) {
        group.push('authorID')
      }
      if (filterBy.hashTagIDs.length) {
        group.push('hashTagID')
      }

      const posts = await Post.findAll({
        where: {
          ...(filterBy.authorIDs && {
            authorID: { [Op.in]: filterBy.authorIDs },
          }),
        },
        ...(filterBy.hashTagIDs && {
          include: [
            {
              association: Post.HashTag,
              as: 'hashtags',
              attributes: ['id', 'hashTagID'],
              where: {
                id: { [Op.in]: filterBy.hashTagIDs },
              },
            },
          ],
        }),
        group: ['authorID', 'hashTagID'],
        ...(orderBy && [[orderField, orderBy.direction]]),
      })

      return { posts }
    },
  },
  // Mutation: {
  //   async postCreate(_, { url, hashtags }, { models }) {
  //     return Post.create({
  //       url,
  //       hashtags,
  //     })
  //   },
  // },
}
export default resolverMap
