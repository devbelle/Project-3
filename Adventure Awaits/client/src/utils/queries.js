import { gql } from '@apollo/client';

export const QUERY_ME = gql `
query QUERY_ME {
    me {
      _id
      name
      email
      trips {
        _id
        title
        destination
        startDate
        endDate
        notes
      }
    }
  }
  `

  export const QUERY_TRIP = gql `
query QUERY_TRIP ($tripId: ID!) {
    trip(id: $tripId) {
      _id
      title
      destination
      startDate
      endDate
      notes
      
    }
  }
  `
export const GET_RESTAURANTS = gql`
query getRestaurants($city: String) {
  getRestaurants(city: $city) {
    name
    averageRating
    priceTag
    currentOpenStatusText
    squareImgUrl
  }
}
`
