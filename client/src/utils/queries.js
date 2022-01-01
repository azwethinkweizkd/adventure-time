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
      }
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
      }
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
      }
    }
  }
`;
