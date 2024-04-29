const typeDefs = `
type User {
    _id: ID
    name: String!
    email: String!
    trips: [Trip]
}

type Trip {
    _id: ID
    title: String!
    destination: String!
    startDate: String
    endDate: String
    notes: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
}

type Mutation {
    addUser(
        name: String!
        email: String!
        password: String!
    ): Auth

    login(name: String!, password: String!): Auth

    addTrip(title: String!
        destination: String!
        startDate: String
        endDate: String
        notes: String): Trip

    updateTrip(tripId: ID!, title: String!
        destination: String!
        startDate: String
        endDate: String
        notes: String): Trip

    removeTrip(tripId: ID!): Trip
}
`;

module.exports = typeDefs;

