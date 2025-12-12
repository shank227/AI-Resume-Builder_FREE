import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user.id,
      title: req.body.title,
      data: req.body.data
    });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Error creating resume" });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch {
    res.status(500).json({ message: "Error fetching resumes" });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    res.json(resume);
  } catch {
    res.status(500).json({ message: "Resume not found" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: req.body.title, data: req.body.data },
      { new: true }
    );

    res.json(resume);
  } catch {
    res.status(500).json({ message: "Error updating resume" });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};


export const deleteResume = async (req, res) => {
  try {
    await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Error deleting resume" });
  }
};
