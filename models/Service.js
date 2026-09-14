import mongoose from "mongoose";

// Service ka Schema - title, description, price aur image storing ke liye
const ServiceSchema = new mongoose.Schema({
  title: String,        // e.g. "Web Development"
  description: String,  // e.g. "We build fast websites"
  price: String,        // e.g. "Starting at ₹15,000"
  image: String,        // e.g. Image URL
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);