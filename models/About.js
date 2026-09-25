import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    tagline:     { type: String, default: "We build digital experiences that matter." },
    description: { type: String, default: "Vuxion is a full-stack web development agency passionate about building fast, scalable, and beautiful web applications. We work closely with startups and businesses to bring their ideas to life." },
    image:       { type: String, default: "" },
    mission:     { type: String, default: "To help businesses grow by delivering high-quality digital products — on time, on budget, and beyond expectations." },
    vision:      { type: String, default: "To become the most trusted web development partner for startups and SMEs across India." },
    stats: {
      type: [{ label: String, value: String }],
      default: [
        { label: "Projects Delivered", value: "50+" },
        { label: "Happy Clients",      value: "30+" },
        { label: "Years Experience",   value: "5+"  },
        { label: "Team Members",       value: "8+"  },
      ],
    },
    teamMembers: {
      type: [{ name: String, role: String, bio: String, image: String }],
      default: [
        { name: "Kunal Tyagi",  role: "Founder & Full-Stack Dev", bio: "Passionate about building scalable web apps with Next.js and MongoDB.", image: "" },
        { name: "Team Member",  role: "UI/UX Designer",           bio: "Crafting beautiful, user-centric interfaces that convert.",           image: "" },
      ],
    },
  },
  { timestamps: true }
);

// Singleton pattern — only one About document
export default mongoose.models.About || mongoose.model("About", AboutSchema);
