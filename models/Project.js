import mongoose from "mongoose";

// Project ka Schema - title, description, techStack, link aur image store karne ke liye
const ProjectSchema = new mongoose.Schema({
  title: String,       // e.g. "E-commerce App"
  description: String,
  techStack: [String], // e.g. ["Next.js", "MongoDB"]
  link: String,        // Live URL
  image: String,       // Project image URL
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);