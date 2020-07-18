import { Resolvers } from '../generated/graphql'
import { AuthenticationError, ApolloError } from 'apollo-server-express'
import { Post } from '../models/Post'
import { LikePost } from '../models/LikePost'
import { NOT_FOUND_ERROR, PERMISSION_ERROR } from '../errorMessages'

const resolver: Resolvers = {
  LikePost: {
    // user: async likePost => {
    //   return await likePost.getUser()
    // },
    // post: async likePost => {
    //   return await likePost.getPost()
    // },
  },
  Mutation: {
    likePost: async (_, { postID }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(PERMISSION_ERROR)
      }
      const post = await Post.findByPk(postID)
      if (post) {
        throw new ApolloError(NOT_FOUND_ERROR)
      }

      const likePostOption = {
        postID,
        userID: currentUser?.id,
      }

      const likePost = await LikePost.findOne({
        where: likePostOption,
      })

      if (!likePost) {
        const newLikePost = await LikePost.create(likePostOption)
        await post.update({ isLiked: true })
        return !!newLikePost
      }

      await likePost.destroy()
      await post.update({ isLiked: false })
      return false
    },
  },
}
export default resolver
