const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    activities: [Activity]!
    residency: String
    myActivities: [String]!
    favoritePlaces: [String]!
    futurePlaces: [String]!
  }
  type Auth {
    token: ID!
    profile: Profile
  }
  type Activity {
    _id: ID
    title: String
    description: String
    comments: [String!]
    createdAt: String
  }
  input activityInput {
    _id: ID
    title: String
    description: String
  }
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    activities: [Activity]!
    activity(activityId: ID!): Activity
  }
  type Mutation {
    addProfile(name: String!, email: String!, password: String!, residency: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile

    addMyActivity(profileId: ID!, activity: String!): Profile
    addFavoritePlaces(profileId: ID!, place: String!): Profile
    addFuturePlaces(profileId: ID!, futurePlace: String!): Profile

    addActivity(profileId: ID!, activityData: activityInput!): Profile
    removeActivity(activityId: ID!): String  
    addComment(activityId: ID!, comment: String!): Activity
    removeComment(activityId: ID!, comment: String!): Activity
  }
`;

module.exports = typeDefs;
