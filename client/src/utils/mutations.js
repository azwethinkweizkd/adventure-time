import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!, $residency: String!) {
    addProfile(name: $name, email: $email, password: $password, residency: $residency) {
      token
      profile {
        _id
        name
      }
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

export const ADD_ACTIVITY = gql`
mutation addActivity($activityData: activityInput!){
  addActivity(activityData: $activityData) {
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
  removeActivity(activityId: $activityId ) {
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

export const ADD_COMMENT = gql`
  mutation addComment($activityId: ID!, $comment: String!) {
    addComment(activityId: $activityId, comment: $comment) {
        _id
        title
        description
        comments
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($activityId: ID!, $comment: String!) {
    removeComment(activityId: $activityId, comment: $comment) {
      _id
      title
      description
      comments
    }
  }
`;

export const ADD_MYACTIVITY = gql`
  mutation addMyActivity($profileId: ID!, $activity: String!) {
    addMyActivity(profileId: $profileId, activity: $activity) {
      _id
      name
      myActivities
    }
  }
`;

export const ADD_FAVORITEPLACES = gql`
  mutation addFavoritePlaces($profileId: ID!, $place: String!) {
    addFavoritePlaces(profileId: $profileId, place: $place) {
      _id
      name
      favoritePlaces
    }
  }
`;

export const ADD_FUTUREPLACES = gql`
  mutation addFuturePlaces($profileId: ID!, $futurePlace: String!) {
    addFuturePlaces(profileId: $profileId, futurePlace: $futurePlace) {
      _id
      name
      futurePlaces
    }
  }
`;
