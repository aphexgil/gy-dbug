const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    username: String!
    password: String
    tickets: [Ticket]
    projects: [Project]
  }

  type Ticket {
    _id: ID
    ticketTitle: String!
    ticketDescription: String!
    ticketAuthor: String!
    ticketStatus: String!
    ticketType: String!
    ticketPriority: String!
    ticketAssignee: String
    createdAt: String
    updatedAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Project {
    _id: ID
    projectTitle: String!
    projectDescription: String!
    projectType: String!
    projectStatus: String!
    projectManager: String!
    users: [User]
    tickets: [Ticket]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    tickets: [Ticket]
    ticket(ticketId: ID!): Ticket
    projects: [Project]
    project(projectId: ID!): Project
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    addTicket(
      ticketTitle: String!
      ticketDescription: String!
      ticketType: String!
      ticketStatus: String!
      ticketPriority: String!
      ticketAuthor: String!
      ticketAssignee: String
      projectId: ID
    ): Ticket
    updateTicket(
      ticketId: ID!
      ticketTitle: String!
      ticketDescription: String!
      ticketType: String!
      ticketStatus: String!
      ticketPriority: String!
    ): Ticket

    addComment(
      ticketId: ID!
      _id: ID
      commentText: String
      commentAuthor: String
      createdAt: String
    ): Ticket

    removeTicket(ticketId: ID!): Ticket
    removeComment(ticketId: ID!, commentId: ID!): Ticket
    removeProject(projectId: ID!): Project
    
    addProject(
      projectTitle: String!
      projectDescription: String!
      projectType: String!
      projectStatus: String!
      projectManager: String!
      users: [ID]
      tickets: [ID]
    ): Project

    addProjectUser(projectId: ID!, userId: ID!): Project

    addProjectTicket(projectId: ID!, ticketId: ID!): Project

    updateProject(
      projectId: ID
      projectTitle: String
      projectDescription: String
      projectManager: String
      projectType: String
      projectStatus: String
    ): Project
  }
`;

module.exports = typeDefs;
