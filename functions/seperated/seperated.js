const { ApolloServer } = require("apollo-server-lambda");
const { typeDefs } = require("./seperatedSchema.js");
const { resolvers } = require("./seperatedResolvers.js");
const { pokemons } = require("./seperatedDb.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function() {
    return { db: pokemons };
  },
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();
