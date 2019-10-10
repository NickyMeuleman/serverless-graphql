const { ApolloServer } = require("apollo-server-lambda");
const { typeDefs } = require("./faunaSchema.js")
const { resolvers } = require("./faunaResolvers.js");
const { client, query } = require("./faunaDb.js");

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
