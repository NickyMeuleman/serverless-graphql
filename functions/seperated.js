const { ApolloServer } = require("apollo-server-lambda");
const { resolvers } = require("../resolvers");
const { importSchema } = require("graphql-import");
const { pokemons } = require("../db");

const typeDefs = importSchema("schema.graphql");

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
