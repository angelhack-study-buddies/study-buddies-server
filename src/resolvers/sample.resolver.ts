import { IResolvers } from 'graphql-tools'

const resolver: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, { currentUser }): string {
      if (currentUser) {
        return currentUser.name
      }
      return `👋 Hello world! 👋`
    },
  },
}
export default resolver
