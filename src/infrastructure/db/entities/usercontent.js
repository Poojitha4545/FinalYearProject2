import mongoose from "mongoose";

const userContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination ID is required"],
    },
    mediaUrl: {
      type: String,
      required: [true, "Media URL is required"], 
    },
    mediaType: {
      type: String,
      required: [true, "Media type is required"],
      enum: ["image", "video"],
    },
    caption: {
      type: String,
      maxlength: [500, "Caption cannot exceed 500 characters"],
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      count: { type: Number, default: 0 },
      users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          maxlength: [300, "Comment cannot exceed 300 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", 
    },
    moderationNote: {
      type: String,
      default: "", 
    },
    isUploaded: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

// Index for fetching content by destination
userContentSchema.index({ destinationId: 1 });

// Index for fetching content by user
userContentSchema.index({ userId: 1 });

// Index for moderation queue (admin dashboard)
userContentSchema.index({ status: 1 });

const UserContent = mongoose.model("UserContent", userContentSchema);

module.exports = UserContent;