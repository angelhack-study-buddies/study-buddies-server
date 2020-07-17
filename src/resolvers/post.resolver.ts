import { Resolvers } from '../generated/graphql'

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
    async postCreate(_, { url, hashtags }, { models }) {
      return models.Post.create({
        url,
        hashtags,
      })
    },
  },
}
export default resolverMap
