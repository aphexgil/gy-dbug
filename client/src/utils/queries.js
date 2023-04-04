import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_TICKETS = gql`
  query tickets {
    tickets {
      _id
      ticketDescription
      ticketPriority
      ticketStatus
      ticketTitle
      ticketType
      ticketAuthor
      ticketAssignee
    }
  }
`;

export const QUERY_SINGLE_TICKET = gql`
  query ticket($ticketId: ID!) {
    ticket(ticketId: $ticketId) {
      _id
      ticketTitle
      ticketDescription
      ticketType
      ticketPriority
      ticketStatus
      createdAt
      updatedAt
      ticketAuthor
      ticketAssignee
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      projectTitle
      projectDescription
      projectManager
      projectStatus
      projectType
      tickets {
        _id
        ticketTitle
        ticketAuthor
        ticketDescription
        ticketPriority
        ticketStatus
        ticketType
      }
      users {
        _id
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      projectTitle
      projectDescription
      projectManager
      projectType
      projectStatus
      tickets {
        _id
      }
      users {
        _id
      }
    }
  }
`;
