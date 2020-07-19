import { Resolvers } from '../generated/graphql'

const resolver: Resolvers = {
  Query: {
    helloWorld: () => {
      return `👋 Hello world! 👋`
    },
  },
}
export default resolver
