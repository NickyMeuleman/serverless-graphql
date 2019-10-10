exports.resolvers = {
  Query: {
    hello: (obj, args, context) => {
      return "Hello, file-seperated world!";
    },
    allPokemon: (obj, args, context) => {
      return context.db;
    },
    pokemonById: (obj, args, context) => {
      return context.db.find(pokemon => pokemon.id === args.id);
    },
    pokemonByName: (obj, args, context) => {
      return context.db.find(pokemon => pokemon.name === args.name);
    }
  },
  Mutation: {
    createPokemon: (obj, args, context) => {
      const pokemon = { id: args.id, name: args.name };
      context.db.push(pokemon);
      return pokemon
    },
    updatePokemon: (obj, args, context) => {
      const pokemon = context.db.find(pokemon => pokemon.id === args.id);
      pokemon.name = args.name
      return pokemon
    },
    deletePokemon: (obj, args, context) => {
      const index = context.db.findIndex(pokemon => pokemon.id === args.id);
      const pokemon = context.db[index]
      context.db.splice(index,1)
      return pokemon
    }
  },
  Pokemon: {
    isVeryBest: (obj, args, context) => {
      // is it Mr. Mime?
      return obj.id === 122;
    }
  }
};
