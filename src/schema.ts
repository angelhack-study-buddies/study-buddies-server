import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import resolvers from './resolvers'

const allTypeDefs = loadFilesSync(path.join(__dirname, '../schema/**/*.graphql'))

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypeDefs),
  resolvers,
})

export default schema
