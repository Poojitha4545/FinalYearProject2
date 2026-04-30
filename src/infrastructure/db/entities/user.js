import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["tourist", "admin"],
      default: "tourist",
    },
    profilePicture: {
      type: String,
      default: null,
    },
     bio: {
      type: String,
      maxlength: [250, "Bio cannot exceed 250 characters"],
      default: "",
    },
    preferences: {
      interests: {
        type: [String],
        enum: ["cultural", "beaches", "wildlife", "adventure", "food", "accommodation"],
        default: [],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);
 

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
 
const User = mongoose.model("User", userSchema);
 
module.exports = User;