const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    activities: [Activity]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Activity {
    _id: ID
    title: String
    comments: String
}

input activityInput {
  title: String
  _id: ID
  comments: String
}

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile


    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }



  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveActivity(activityData: activityInput!): Profile
    removeActivity(activityId: ID): Profile 
    removeProfile: Profile
    addSkill(profileId: ID!, skill: String!): Profile
    removeSkill(skill: String!): Profile
  }
`;

module.exports = typeDefs;
