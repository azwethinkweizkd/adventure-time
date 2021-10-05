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
  mutation addComment($profileId: ID!, $comment: String!) {
    addComment(profileId: $profileId, comment: $comment) {
      _id
      name
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
  mutation removeComment($comment: String!) {
    removeComment(comment: $comment) {
      _id
      name
      comments
    }
  }
`;

export const SAVE_Activity = gql`
mutation saveActivity($activityData: activityInput!){
    saveActivity(activityData: $activityData) {
        _id
        name
        email 
        savedActivities {
            _id
            title
            comments
        }
    }
}
`;

export const REMOVE_ACTIVITY = gql`
mutation removeActivity($activity: String!) {
  removeActivity(activity: $activity) {
    _id
    name
  }
}
`;