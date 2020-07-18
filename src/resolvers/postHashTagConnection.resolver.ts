import { PostHashTagConnection } from '../models/PostHashTagConnection'
import { Resolvers } from '../generated/graphql'

const resolver: Resolvers = {
  PostHashTagConnection: {
    post: async postHashTagConnection => {
			return await postHashTagConnection.
		},
  },
}
