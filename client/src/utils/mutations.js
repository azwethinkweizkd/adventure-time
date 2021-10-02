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

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
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

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
    }
  }
`;

export const SAVE_Activity = gql`
mutation saveActivity($activityData: activityInput!){
    saveActivity(activityData: $activityData) {
        _id
        username
        email 
        savedActivities {
            _id
            title
            comments

        }
    }
}
`;

export const REMOVE_Activity = gql`
mutation removeActivity($activityId: String!){
    removeActivity(activityId: $activityId) {
        _id
        username
        email 
        savedActivities {
            _id
            title
            comments
        }
    }
}
`;