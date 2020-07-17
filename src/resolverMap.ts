// resolverMap.ts
import { Resolvers } from './generated/graphql'

// 아직 에러가 나나요?
const resolverMap: Resolvers = {
  Query: {
    helloWorld(_, args, { currentUser }): string {
      if (currentUser) {
        return currentUser.name
      }
      return `👋 Hello world! 👋`
    },
    async getPost(_, { id }, { models }) {
      return models.Post.findByPk(id)
    },
    async getAllPosts(_, args, { models }) {
      return models.Post.findAll()
    },
  },
  Mutation: {
    async createPost(_, { url, hashtag }, { models }) {
      return models.Post.create({
        url,
        hashtag,
      })
    },
  },
}
export default resolverMap
