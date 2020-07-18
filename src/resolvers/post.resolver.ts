import { PostOrderField, Resolvers } from '../generated/graphql'

import { ApolloError } from 'apollo-server-express'
import { HashTag } from '../models/HashTag'
import { LikePost } from '../models/LikePost'
import { Op } from 'sequelize'
import { Post } from '../models/Post'
import { PostHashTagConnection } from '../models/PostHashTagConnection'
import ogs from 'open-graph-scraper'

const resolverMap: Resolvers = {
  Post: {
    // TODO: title, content, previewImage resolver 추가
    author: async post => {
      return await post.getAuthor()
    },
    hashTags: async post => {
      return await post.getHashTags()
    },
    isLiked: async post => {
      const likePost = await LikePost.findOne({ where: { postID: post.id } })
      return !!likePost
    },
    likeCount: async post => {
      const likePosts = await post.getLikePosts()
      return likePosts?.length
    },
    title: async post => {
      if (post.url) return ''
      const { error, result } = await ogs({
        url: post.url,
        onlyGetOpenGraphInfo: true,
      })

      if (error) throw new ApolloError(error)

      return result?.ogTitle || ''
    },
    description: async post => {
      if (post.url) return ''
      const { error, result } = await ogs({
        url: post.url,
        onlyGetOpenGraphInfo: true,
      })

      if (error) throw new ApolloError(error)

      return result?.ogDescription || ''
    },
    previewImage: async post => {
      if (post.url) return ''
      const { error, result } = await ogs({
        url: post.url,
        onlyGetOpenGraphInfo: true,
      })

      if (error) throw new ApolloError(error)

      return result?.ogImage?.url || ''
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
  Mutation: {
    postCreate: async (_, { input }) => {
      try {
        const { authorID, url, hashTags } = input
        const post = await Post.create({ authorID, url })
        await Promise.all(
          hashTags.map(async hashTagName => {
            const [hashTag] = await HashTag.findOrCreate({
              where: { name: hashTagName },
            })
            await PostHashTagConnection.create({
              postID: post?.id,
              hashtagID: hashTag?.id,
            })
          }),
        )
        return { post }
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
  },
}
export default resolverMap
