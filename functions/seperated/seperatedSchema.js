const { gql } = require("apollo-server-lambda")

exports.typeDefs = gql`
type Query {
  hello: String!
  allPokemon: [Pokemon]!
  pokemonById(id: Int!): Pokemon
  pokemonByName(name: String!): Pokemon
}

type Mutation {
  createPokemon(id: Int!, name: String!): Pokemon
  deletePokemon(id: Int!): Pokemon
  updatePokemon(id: Int!, name: String!): Pokemon
}

type Pokemon {
  id: Int!
  name: String!
  isVeryBest: Boolean!
}
`