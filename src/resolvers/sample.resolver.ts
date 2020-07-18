import { Resolvers } from '../generated/graphql'

const resolver: Resolvers = {
  Query: {
    helloWorld(_, args, { currentUser }): string {
      if (currentUser) {
        return currentUser.name
      }
      return `👋 Hello world! 👋`
    },
  },
}
export default resolver
