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
  },
}
export default resolverMap
