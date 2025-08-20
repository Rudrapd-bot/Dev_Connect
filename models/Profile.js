import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
