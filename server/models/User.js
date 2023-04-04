const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // ** V2 Implementation ** - Role can be selected as a Boolean, and continue research into "select" possibly in schemas
  // role: {
  //     type: String,
  //     required: true,
  // },
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  // ** V2 Implementation ** - Requires seperate Project Schema to be defined
  projects: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Project'
      },
  ],
  
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
