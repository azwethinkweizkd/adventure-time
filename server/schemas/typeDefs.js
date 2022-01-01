const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    profile: Profile
  }

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

  type Activity {
    _id: ID
    title: String
    description: String
    comments: [String!]
  }

  input activityInput {
    _id: ID
    title: String
    description: String
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    activity(activityId: ID!): Activity
    me: Profile
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addProfile(name: String!, email: String!, password: String!, residency: String!): Auth
    removeProfile: Profile

    addMyActivity(profileId: ID!, activity: String!): Profile
    addFavoritePlaces(profileId: ID!, place: String!): Profile
    addFuturePlaces(profileId: ID!, futurePlace: String!): Profile

    addActivity(activityData: activityInput!): Profile
    removeActivity(activityId: ID! ): Profile

    addComment(activityId: ID!, comment: String!): Activity
    removeComment(activityId: ID!, comment: String!): Activity
  }
`;

module.exports = typeDefs;
