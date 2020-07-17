// resolverMap.ts
import { IResolvers } from 'graphql-tools'

interface Post {
  id: number
  authorID: string
  url: string
  likeCount: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, { currentUser }): string {
      if (currentUser) {
        return currentUser.name
      }
      return `👋 Hello world! 👋`
    },
    posts: () => {},
  },
  Mutations: {},
}
export default resolverMap
