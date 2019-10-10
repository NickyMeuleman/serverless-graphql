exports.resolvers = {
  Query: {
    hello: (obj, args, context) => {
      return "Hello, faunadb world!";
    },
    allPokemon: (obj, args, { client, query: q }) => {
      return client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("pokemonSortById")), { size: 256 }),
            q.Lambda(["id", "ref"], q.Select(["data"], q.Get(q.Var("ref"))))
          )
        )
        .then(result => result.data);
    },
    pokemonById: (obj, args, { client, query: q }) => {
      return client
        .query(q.Get(q.Match(q.Index("pokemonById"), args.id)))
        .then(result => result.data);
    },
    pokemonByName: (obj, args, { client, query: q }) => {
      return client
        .query(q.Get(q.Match(q.Index("pokemonByName"), args.id)))
        .then(result => result.data);
    }
  },
  Mutation: {
    createPokemon: (obj, args, { client, query: q }) => {
      return client
        .query(
          q.Create(q.Collection("Pokemon"), {
            data: { id: args.id, name: args.name }
          })
        )
        .then(result => result.data);
    },
    deletePokemon: (obj, args, { client, query: q }) => {
      return client
        .query(
          q.Delete(
            q.Select(["ref"], q.Get(q.Match(q.Index("pokemonById"), args.id)))
          )
        )
        .then(result => result.data);
    },
    updatePokemon: (obj, args, { client, query: q }) => {
      return client
        .query(
          q.Update(
            q.Select(["ref"], q.Get(q.Match(q.Index("pokemonById"), args.id))),
            { data: { name: args.name } }
          )
        )
        .then(result => result.data);
    }
  },
  Pokemon: {
    isVeryBest: (obj, args, context) => {
      // is it Mr. Mime?
      return obj.id === 122;
    }
  }
};
