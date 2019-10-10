// This file was run once (using node) to populate the fauna database

const fetch = require("node-fetch");
const { client, query } = require("./faunaDb.js");
const q = query;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=151";

fetch(pokeAPI)
  .then(res => res.json())
  .then(res => {
    const pokemonres = res.results.map((item, i) => ({
      id: i + 1,
      name: item.name
    }));
    client.query(
      q.Map(
        pokemonres,
        q.Lambda(
          "pokemon",
          q.Create(q.Collection("Pokemon"), {
            data: {
              id: q.Select(["id"], q.Var("pokemon")),
              name: q.Select(["name"], q.Var("pokemon"))
            }
          })
        )
      )
    );
  });
