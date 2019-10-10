const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String!
    allPokemon: [Pokemon]!
    pokemonById(id: Int!): Pokemon
    pokemonByName(name: String!): Pokemon
  }
  type Mutation {
    createPokemon(id: Int!, name: String!, isVeryBest: Boolean!): Pokemon
    deletePokemon(id: Int!): Pokemon
    updatePokemon(id: Int!, name: String, isVeryBest: Boolean): Pokemon
  }
  type Pokemon {
    id: ID!
    name: String!
    isVeryBest: Boolean!
  }
`;

// I know the plural is Pokemon, don't judge me
const pokemons = [
  { id: 122, name: "Mr. Mime", isVeryBest: true },
  { id: 25, name: "Pikachu", isVeryBest: false },
  { id: 7, name: "Squirtle", isVeryBest: false }
];

const resolvers = {
  Query: {
    hello: (obj, args, context) => {
      return "Hello, world!";
    },
    allPokemon: (obj, args, context) => {
      return pokemons;
    },
    pokemonById: (obj, args, context) => {
      return pokemons.find(pokemon => pokemon.id === args.id);
    },
    pokemonByName: (obj, args, context) => {
      return pokemons.find(pokemon => pokemon.name === args.name);
    }
  },
  Mutation: {
    createPokemon: (obj, args, context) => {
      const pokemon = {
        id: args.id,
        name: args.name,
        isVeryBest: args.isVeryBest
      };
      pokemons.push(pokemon);
      return pokemon;
    },
    updatePokemon: (obj, args, context) => {
      const pokemon = pokemons.find(pokemon => pokemon.id === args.id);
      if (args.name) pokemon.name = args.name;
      if (args.isVeryBest) pokemon.isVeryBest = args.isVeryBest
      return pokemon;
    },
    deletePokemon: (obj, args, context) => {
      const index = pokemons.findIndex(pokemon => pokemon.id === args.id);
      const pokemon = pokemons[index];
      pokemons.splice(index, 1);
      return pokemon;
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
