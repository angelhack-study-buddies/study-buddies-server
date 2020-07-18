import { HashTag } from '../models/HashTag'
import { Resolvers } from '../generated/graphql'

const resolver: Resolvers = {
  HashTag: {
    posts: async hashTag => {
      return await hashTag.getPosts()
    },
  },
  Query: {
    hashTag: async (_, { id }): Promise<HashTag> => {
      return await HashTag.findByPk(Number(id))
    },
  },
}

export default resolver
