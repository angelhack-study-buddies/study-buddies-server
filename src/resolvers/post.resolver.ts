import ogs from 'open-graph-scraper'
import { ApolloError } from 'apollo-server-express'
import { Op } from 'sequelize'

import { HashTag } from '../models/HashTag'
import { LikePost } from '../models/LikePost'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { PostHashTagConnection } from '../models/PostHashTagConnection'
import { Resolvers, PostFilter } from '../generated/graphql'

const resolver: Resolvers = {
  Post: {
    author: async post => {
      return await User.findByPk(post?.authorID)
    },
    hashTags: async post => {
      return await HashTag.findAll({ where: { postID: post?.id } })
    },
    isLiked: async (post, _, { currentUser }) => {
      if (!currentUser) return false
      const likePost = await LikePost.findOne({ where: { postID: post?.id, userID: currentUser?.id } })
      return !!likePost
    },
    likeCount: async post => {
      const likePosts = await LikePost.findAll({ where: { postID: post?.id } })
      return likePosts?.length
    },
    title: async post => {
      if (post?.title) return post?.title
      if (!post.url) return ''
      const { error, result } = await ogs({
        url: post.url,
        onlyGetOpenGraphInfo: true,
      })

      if (error) throw new ApolloError(error)

      return result?.ogTitle || ''
    },
    description: async post => {
      if (post?.description) return post?.description
      if (!post.url) return ''
      const { error, result } = await ogs({
        url: post.url,
        onlyGetOpenGraphInfo: true,
      })

      if (error) throw new ApolloError(error)

      return result?.ogDescription || ''
    },
    previewImage: async post => {
      if (post?.previewURL) return post?.previewURL
      if (!post.url) return ''
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
      const { filterBy, orderBy, pagination } = input

      const defaultPagination = { page: 1, pageSize: 10 }
      const finalPagination = pagination || defaultPagination

      const filterOptions = buildPostGetManyFilterOption(filterBy)
      const posts = await Post.findAll({
        ...filterOptions,
        ...(orderBy && { order: [[orderBy?.field.toLowerCase(), orderBy?.direction]] }),
        offset: (finalPagination.page - 1) * finalPagination.pageSize,
        limit: finalPagination.pageSize,
      })

      return { posts }
    },
  },
  Mutation: {
    postCreate: async (_, { input }) => {
      try {
        const { authorID, url, hashTags } = input

        const { error, result } = await ogs({
          url,
          onlyGetOpenGraphInfo: true,
        })

        const post = await Post.create({
          authorID,
          url,
          title: result?.ogTitle || '',
          description: result?.ogDescription || '',
          previewURL: result?.ogImage?.url || '',
        })

        if (error) throw new ApolloError(error)

        await Promise.all(
          hashTags.map(async hashTagName => {
            const [hashTag] = await HashTag.findOrCreate({
              where: { name: hashTagName, postID: post?.id },
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
    postUpdate: async (_, { input }) => {
      try {
        const { id: postID, url, hashTags, likeCount } = input
        const post = await Post.findByPk(postID)

        const updateOption = { url, likeCount }
        if (url !== post?.url) {
          const { error, result } = await ogs({
            url,
            onlyGetOpenGraphInfo: true,
          })

          if (error) throw new ApolloError(error)

          Object.assign(updateOption, {
            title: result?.ogTitle || '',
            description: result?.ogDescription || '',
            previewURL: result?.ogImage?.url || '',
          })
        }

        const updatedPost = await post.update(updateOption)

        if (hashTags?.length) {
          await Promise.all(
            hashTags?.map(async hashTagName => {
              const [hashTag, created] = await HashTag.findOrCreate({
                where: { postID },
                defaults: { name: hashTagName, postID },
              })

              if (created) {
                await PostHashTagConnection.create({ postID, hashtagID: hashTag?.id })
              }
            }),
          )
        }

        return { post: updatedPost }
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    postDelete: async (_, { id }) => {
      try {
        const post = await Post.findByPk(id)
        return post
          .destroy()
          .then(() => true)
          .catch(() => false)
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
  },
}
export default resolver

const buildPostGetManyFilterOption = (filterBy: PostFilter) => {
  const likeClause = filterBy?.hashTags?.map(tag => ({ [Op.like]: `%${tag}%` }))
  const likeOptions = { [Op.or]: likeClause }

  return {
    where: {
      ...(filterBy?.authorIDs && {
        authorID: { [Op.in]: filterBy.authorIDs },
      }),
    },
    ...(filterBy?.hashTags && {
      include: [
        {
          association: Post.HashTags,
          as: 'hashtags',
          attributes: ['name'],
          ...(filterBy?.hashTags && { where: { name: likeOptions } }),
        },
      ],
    }),
  }
}
