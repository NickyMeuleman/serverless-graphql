const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
    allPokemon: [Pokemon!]
    pokemon(id: Int!): Pokemon
    pokemonByName(name: String!): Pokemon
  }
  type Pokemon {
    id: ID!
    name: String!
    theVeryBest: Boolean!
  }
`;

// I know the plural is Pokemon, don't judge me
const pokemons = [
  { id: 122, name: "Mr. Mime", theVeryBest: true },
  { id: 25, name: "Pikachu", theVeryBest: false },
  { id: 7, name: "Squirtle", theVeryBest: false }
];

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    allPokemon: (root, args, context) => {
      return pokemons;
    },
    pokemon: (root, args, context) => {
      return pokemons.find(pokemon => pokemon.id === args.id);
    },
    pokemonByName: (root, args, context) => {
      return pokemons.find(pokemon => pokemon.name === args.name);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();
