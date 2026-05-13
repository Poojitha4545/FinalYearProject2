import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "United States",
  },
  interests: {
    type: [String],
    enum: ["culture", "beach", "wildlife", "adventure", "food"],
    default: [],
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;