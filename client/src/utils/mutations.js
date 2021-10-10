import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($activityId: ID!, $comment: String!) {
    addComment(activityId: $activityId, comment: $comment) {
      comments
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      } 
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($profileId: ID!, $comment: String!) {
    removeComment(profileId: $profileId, comment: $comment) {
      _id
      name
      comments
    }
  }
`;

export const ADD_ACTIVITY = gql`
mutation addActivity($profileId: ID!, $activityData: activityInput!){
    addActivity(profileId: $profileId, activityData: $activityData) {
        _id
        name
        activities {
          title
          description
          comments 
        }
    }
}
`;

export const REMOVE_ACTIVITY = gql`
mutation removeActivity($activityId: ID!) {
  removeActivity(activityId: $activityId) 
}
`;