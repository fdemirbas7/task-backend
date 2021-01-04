import { gql } from 'apollo-server-express';
export const typeDefs = gql`
  type Query {
    event(leadId: ID!): Event
    events: [Event!]!
  }
  type Event {
    name: String!
    leadId: ID!
    value: Int!
  }
  type Mutation {
    createEvent(name: String!, leadId: ID!): Event!
    updateEvent(leadId: ID!, payload: Int!): Event!
  }
  type Subscription {
    eventUpdated: [Event!]!
  }
`;
