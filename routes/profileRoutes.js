import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";   // <-- added this

const router = express.Router();

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "email"]);
    if (!profile) return res.status(400).json({ message: "No profile found for this user" });
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", protect, async (req, res) => {
  const { bio, skills, github, linkedin } = req.body;

  // Build profile object
  const profileFields = { user: req.user.id };
  if (bio) profileFields.bio = bio;
  if (skills) profileFields.skills = skills.split(",").map((skill) => skill.trim());
  if (github) profileFields.github = github;
  if (linkedin) profileFields.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "email"]);
    if (!profile) return res.status(400).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/profile
// @desc    Delete profile & user
// @access  Private
router.delete("/", protect, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ message: "User and profile deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
