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