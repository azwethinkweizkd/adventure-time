const { gql } = require("apollo-server-express");

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
    messages: [Message]
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
    profile: Profile
  }
  input activityInput {
    _id: ID
    title: String
    description: String
  }
  type Message {
    id: ID!
    message: String!
    senderName: String!
    receiverName: String!
    timestamp: Float!
    profiles: [Profile]
  }
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    activities: [Activity]!
    activity(activityId: ID!): Activity
    messages: [Message]!
  }
  type Mutation {
    addProfile(
      name: String!
      email: String!
      password: String!
      residency: String!
    ): Auth
    login(email: String!, password: String!): Auth

    removeProfile: Profile

    addMyActivity(profileId: ID!, activity: String!): Profile
    addFavoritePlaces(profileId: ID!, place: String!): Profile
    addFuturePlaces(profileId: ID!, futurePlace: String!): Profile

    addActivity(profileId: ID!, activityData: activityInput!): Profile
    removeActivity(activityId: ID!): String
    addComment(activityId: ID!, comment: String!): Activity
    removeComment(activityId: ID!, comment: String!): Activity

    userTyping(name: String!, receiverName: String!): Boolean!
    sendMessage(
      senderName: String!
      receiverName: String!
      message: String!
      timestamp: Float!
    ): Message!
    updateMessage(id: ID!, message: String!): Message!
    deleteMessage(id: String!): Boolean!
  }
  type Subscription {
    newMessage(receiverName: String!): Message
    newUser: Profile
    oldUser: String
    userTyping(receiverName: String!): String
  }
`;

module.exports = typeDefs;
