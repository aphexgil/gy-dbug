import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_TICKET = gql`
  mutation Mutation(
    $ticketTitle: String!
    $ticketDescription: String!
    $ticketType: String!
    $ticketStatus: String!
    $ticketPriority: String!
    $ticketAuthor: String!
    $ticketAssignee: String
    $projectId: ID
  ) {
    addTicket(
      ticketTitle: $ticketTitle
      ticketDescription: $ticketDescription
      ticketType: $ticketType
      ticketStatus: $ticketStatus
      ticketPriority: $ticketPriority
      ticketAuthor: $ticketAuthor
      ticketAssignee: $ticketAssignee
      projectId: $projectId
    ) {
      _id
      ticketAuthor
      ticketDescription
      ticketStatus
      ticketTitle
      ticketPriority
      ticketType
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation updateTicket(
    $ticketId: ID!
    $ticketTitle: String!
    $ticketDescription: String!
    $ticketType: String!
    $ticketStatus: String!
    $ticketPriority: String!
  ) {
    updateTicket(
      ticketId: $ticketId
      ticketTitle: $ticketTitle
      ticketDescription: $ticketDescription
      ticketType: $ticketType
      ticketStatus: $ticketStatus
      ticketPriority: $ticketPriority
    ) {
      _id
      ticketTitle
      ticketDescription
      ticketType
      ticketAuthor
      ticketStatus
      ticketPriority
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $ticketId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      commentText: $commentText
      commentAuthor: $commentAuthor
      ticketId: $ticketId
    ) {
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($ticketId: ID!, $commentId: ID!) {
    removeComment(ticketId: $ticketId, commentId: $commentId) {
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_TICKET = gql`
  mutation removeTicket($ticketId: ID!) {
    removeTicket(ticketId: $ticketId) {
      _id
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $projectTitle: String!
    $projectDescription: String!
    $projectType: String!
    $projectStatus: String!
    $projectManager: String!
  ) {
    addProject(
      projectTitle: $projectTitle
      projectDescription: $projectDescription
      projectType: $projectType
      projectStatus: $projectStatus
      projectManager: $projectManager
    ) {
      _id
      projectTitle
      projectDescription
      projectType
      projectStatus
      projectManager
      tickets {
        _id
      }
      users {
        _id
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $projectId: ID
    $projectTitle: String
    $projectDescription: String
    $projectType: String
    $projectStatus: String
    $projectManager: String
  ) {
    updateProject(
      projectId: $projectId
      projectTitle: $projectTitle
      projectDescription: $projectDescription
      projectType: $projectType
      projectStatus: $projectStatus
      projectManager: $projectManager
    ) {
      _id
      projectTitle
      projectDescription
      projectType
      projectStatus
      projectManager
      tickets {
        _id
      }
      users {
        _id
      }
    }
  }
`;

export const ADD_PROJECT_USER = gql`
  mutation addProjectUser($projectId: ID!, $userId: ID!) {
    addProjectUser(projectId: $projectId, userId: $userId) {
      users {
        _id
      }
    }
  }
`;

export const ADD_PROJECT_TICKET = gql`
  mutation addProjectTicket($projectId: ID!, $ticketId: ID!) {
    addProjectTicket(projectId: $projectId, ticketId: $ticketId) {
      _id
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
    }
  }
`;
