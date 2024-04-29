import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
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
  }
`;

export const ADD_TRIP = gql`
mutation addTrip($title: String!, $destination: String!, $startDate: String, $endDate: String, $notes: String) {
    addTrip(title: $title, destination: $destination, startDate: $startDate, endDate: $endDate, notes: $notes) {
      _id
      title
      destination
      startDate
      endDate
      notes
    }
  }
`;

export const UPDATE_TRIP = gql`
mutation updateTrip($tripId: ID!, $title: String!, $destination: String!, $startDate: String, $endDate: String, $notes: String) {
    updateTrip(tripId: $tripId, title: $title, destination: $destination, startDate: $startDate, endDate: $endDate, notes: $notes) {
      _id
      title
      destination
      startDate
      endDate
      notes
    }
  }
`;

export const REMOVE_TRIP = gql`
mutation removeTrip($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
      title
      destination
      startDate
      endDate
      notes
    }
  }
`;
