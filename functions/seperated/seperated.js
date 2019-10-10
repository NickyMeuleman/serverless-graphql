const { ApolloServer } = require("apollo-server-lambda");
const { importSchema } = require("graphql-import");
const { resolvers } = require("./seperatedResolvers.js");
const { pokemons } = require("./db.js");

const typeDefs = importSchema("./functions/seperated/schema.graphql");

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