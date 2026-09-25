import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  category:  { type: String, required: true },
  title:     { type: String, required: true },
  excerpt:   { type: String, required: true },
  readTime:  { type: String, default: "5 min read" },
  date:      { type: String, default: "" },
  emoji:     { type: String, default: "📝" },
  color:     { type: String, default: "from-indigo-500 to-violet-500" },
  image:     { type: String, default: "" },   // custom upload image
  link:      { type: String, default: "" },   // external blog link
  order:     { type: Number, default: 0 },
  active:    { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);
