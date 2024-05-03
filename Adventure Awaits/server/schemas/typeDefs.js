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

type Restaurant {
    name: String
    averageRating: Float
    priceTag: String
    currentOpenStatusText: String
    squareImgUrl: String
    locationId: Int
}

type Hotel {
    title: String
    priceForDisplay: String
    provider: String
    id: Int
}

type Query {
    me: User 
    trip(id: ID!):Trip 
    getRestaurants(city: String): [Restaurant]
    getHotels(city: String, startDate: String, endDate: String): [Hotel]
}

type Mutation {
    addUser(
        name: String!
        email: String!
        password: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addTrip(title: String!
        destination: String!
        startDate: String
        endDate: String
        notes: String): User

    updateTrip(tripId: ID!, title: String!
        destination: String!
        startDate: String
        endDate: String
        notes: String): Trip

    removeTrip(tripId: ID!): Trip
}
`;

module.exports = typeDefs;

