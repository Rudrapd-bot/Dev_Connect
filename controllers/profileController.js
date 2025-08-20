import Profile from "../models/Profile.js";

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, skills, github, linkedin } = req.body;

    const profileFields = {
      user: req.user.id,
      bio,
      skills: skills?.split(",").map(skill => skill.trim()), // convert "JS, React" -> ["JS", "React"]
      github,
      linkedin,
    };

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged in user's profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "email"]);
    if (!profile) return res.status(404).json({ message: "No profile found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
