import { ApolloError } from 'apollo-server-express'
import { HashTag } from '../models/HashTag'
import { Resolvers } from '../generated/graphql'

const resolverMap: Resolvers = {
  HashTag: {
    postID: async hashTag => {
      return await hashTag.getPosts()
    },
  },
  Query: {
    hashTag: async (_, { id }): Promise<HashTag> => {
      return await HashTag.findByPk(id)
    },
  },
}
