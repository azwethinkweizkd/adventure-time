import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      residency
      myActivities
      favoritePlaces
      futurePlaces
      activities{
        _id
        title
        description
        comments
        createdAt
      }
    }
  }
`;

export const QUERY_ACTIVITIES = gql`
  query allActivities {
    activities {
        _id
        title
        description
        comments
        createdAt
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      residency
      myActivities
      favoritePlaces
      futurePlaces
      activities{
        _id
        title
        description
        comments 
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_ACTIVITY = gql `
query singleActivity ($activityId: ID!){
  activity(activityId: $activityId){
      _id
      title
      description
      comments
      createdAt
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      residency
      myActivities
      favoritePlaces
      futurePlaces
      activities{
        _id
        title
        description
        comments
        createdAt
      }
    }
  }
`;
