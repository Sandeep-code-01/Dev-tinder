const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
    },

    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },

    about: {
      type: String,
      default: "hello, I am a software developer",
    },

    skills: {
      type: [String],
      default: ["html", "css", "javascript"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);