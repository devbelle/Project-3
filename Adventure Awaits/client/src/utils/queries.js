import { gql } from '@apollo/client';

export const QUERY_ME = gql `
query QUERY_ME {
    me {
      _id
      name
      email
      trips {
        _id
        name
        destination
        startDate
        endDate
        notes
      }
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