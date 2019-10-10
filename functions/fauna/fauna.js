const { ApolloServer } = require("apollo-server-lambda");
const { importSchema } = require("graphql-import");
const { resolvers } = require("./faunaResolvers.js");
const { client, query } = require("./faunaDb.js");

const typeDefs = importSchema("./functions/fauna/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function() {
    return { client, query };
  },
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();
