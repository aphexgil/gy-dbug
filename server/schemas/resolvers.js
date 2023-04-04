const { AuthenticationError } = require("apollo-server-express");
const { User, Ticket, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    tickets: async () => {
      return Ticket.find().sort({ createdAt: -1 });
    },
    ticket: async (parent, { ticketId }) => {
      return Ticket.findOne({ _id: ticketId });
    },
    projects: async () => {
      return Project.find().sort({ createdAt: -1 });
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId }).populate('tickets');
    },
    users: async () => {
      return User.find();
    },
  },

  Mutation: {
    addUser: async (parent, { email, password, username }) => {
      const user = await User.create({ email, password, username });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addTicket: async (
      parent,
      {
        ticketTitle,
        ticketDescription,
        ticketType,
        ticketStatus,
        ticketPriority,
        ticketAuthor,
        ticketAssignee,
        projectId
      },
      context
    ) => {
      if (context.user) {
        const ticket = await Ticket.create({
          ticketTitle,
          ticketDescription,
          ticketType,
          ticketStatus,
          ticketPriority,
          ticketAuthor,
          ticketAssignee,
        });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { tickets: ticket._id } }
        // );

        if(projectId){
          await Project.findOneAndUpdate(
            {_id: projectId},
            { $addToSet: { tickets: ticket._id } }
          );
        }

        return ticket;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTicket: async (
      parent,
      {
        ticketId,
        ticketTitle,
        ticketDescription,
        ticketType,
        ticketStatus,
        ticketPriority,
      },
      context
    ) => {
      if (context.user) {
        return Ticket.findOneAndUpdate(
          { _id: ticketId },
          {
            $set: {
              ticketTitle: ticketTitle,
              ticketDescription: ticketDescription,
              ticketType: ticketType,
              ticketStatus: ticketStatus,
              ticketPriority: ticketPriority,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addComment: async (
      parent,
      { ticketId, commentText, commentAuthor },
      context
    ) => {
      if (context.user) {
        return Ticket.findOneAndUpdate(
          { _id: ticketId },
          {
            $addToSet: {
              comments: {
                commentText: commentText,
                commentAuthor: commentAuthor,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeTicket: async (parent, { ticketId }, context) => {
   
      if (context.user) {
        const ticket = await Ticket.findOneAndDelete({
          _id: ticketId,
          // ticketAuthor: context.user.username,
        });
     
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { ticket: ticket._id } }
        );

        return ticket;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { ticketId, commentId }, context) => {
      if (context.user) {
        return Ticket.findOneAndUpdate(
          { _id: ticketId },
          {
            $pull: {
              comments: {
                _id: commentId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addProject: async (
      parent,
      {
        projectTitle,
        projectDescription,
        projectManager,
        projectType,
        projectStatus,
        users,
        tickets,
      },
      context
    ) => {
      //users = [...users, context.user._id];
      if (context.user) {
        const project = await Project.create({
          projectTitle,
          projectDescription,
          projectManager,
          projectType,
          projectStatus,
          users,
          tickets,
        });
        await User.updateMany(
          { _id: { $in: project.users } },
          { $addToSet: { projects: project._id } }
        );
        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addProjectUser: async (parent, { projectId, userId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { users: userId } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { projects: projectId } }
        );
        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addProjectTicket: async (parent, { projectId, ticketId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { tickets: ticketId } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateProject: async (
      parent,
      {
        projectId,
        projectTitle,
        projectDescription,
        projectManager,
        projectType,
        projectStatus,
      },
      context
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $set: {
              projectTitle: projectTitle,
              projectDescription: projectDescription,
              projectType: projectType,
              projectStatus: projectStatus,
              projectManager: projectManager,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  
  removeProject: async (parent, { projectId }, context) => {

    if (context.user) {
      const project = await Project.findOneAndDelete({
        _id: projectId,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { project: project._id } }
      );

      return project;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
},
};

module.exports = resolvers;
