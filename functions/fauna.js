const { ApolloServer } = require("apollo-server-lambda");
const { resolvers } = require("../resolvers/faunaResolvers");
const { importSchema } = require("graphql-import");
const { client, query } = require("../faunaDb");

const typeDefs = importSchema("schema.graphql");

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
