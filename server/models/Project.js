const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    projectManager: {
      type: String,
      required: true,
      trim: true,
    },
    projectType: {
      type: String,
      required: true,
      default: "Open",
    },
    projectStatus: {
      type: String,
      required: true,
      default: "Open",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
