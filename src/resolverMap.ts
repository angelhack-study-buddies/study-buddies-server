// resolverMap.ts
import { IResolvers } from 'graphql-tools'

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, { currentUser }): string {
      if (currentUser) {
        return currentUser.name
      }
      return `👋 Hello world! 👋`
    },
    async getPost(_: void, { id }, { models }) {
      return models.Post.findByPk(id)
    },
    async getAllPosts(_: void, args: void, { models }) {
      return models.Post.findAll()
    },
  },
  Mutations: {
    async createPost(_: void, { url, hashtag }, { models }) {
      return models.Post.create({
        url,
        hashtag,
      })
    },
  },
}
export default resolverMap
