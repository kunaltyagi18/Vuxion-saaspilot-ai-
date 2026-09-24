import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String, required: true },
  review:   { type: String, required: true },
  rating:   { type: Number, default: 5, min: 1, max: 5 },
  initials: { type: String },
  color:    { type: String, default: "bg-indigo-600" },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
