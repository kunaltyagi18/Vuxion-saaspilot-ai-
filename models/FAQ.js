import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  keywords: [String],
  answer: String,
}, { timestamps: true });

export default mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);