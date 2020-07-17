import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

const allTypeDefs = loadFilesSync(path.join(__dirname, '../schema/**/*.graphql'))
const allResolvers = loadFilesSync(path.join(__dirname, './resolvers/**/*.resolver.ts'))

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypeDefs),
  resolvers: mergeResolvers(allResolvers),
})

export default schema
