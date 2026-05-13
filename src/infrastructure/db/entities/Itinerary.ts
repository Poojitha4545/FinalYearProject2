import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Itinerary title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    destinations: [
      {
        destinationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Destination",
          required: true,
        },
        order: {
          type: Number,
          required: true, // Position in the route (1, 2, 3...)
        },
        visitDate: {
          type: Date,
          default: null,
        },
        notes: {
          type: String,
          maxlength: [300, "Notes cannot exceed 300 characters"],
          default: "",
        },
        stayDuration: {
          type: Number, // Duration in hours
          default: 2,
          min: 0,
        },
      },
    ],
    totalDistance: {
      type: Number, // Distance in kilometers (calculated by Haversine formula)
      default: 0,
      min: 0,
    },
    totalDuration: {
      type: Number, // Duration in days
      default: 1,
      min: 1,
    },
    isSaved: {
      type: Boolean,
      default: false, // User can save/bookmark their itinerary
    },
    isPublic: {
      type: Boolean,
      default: false, // Whether other users can view this itinerary
    },
    interests: {
      type: [String],
      enum: ["cultural", "beaches", "wildlife", "adventure", "food", "accommodation"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for fetching itineraries by user
itinerarySchema.index({ userId: 1 });

// Index for public itineraries (future feature)
itinerarySchema.index({ isPublic: 1 });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;