import mongoose from "mongoose";

const arExperienceSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination ID is required"],
      unique: true, // Each destination has exactly one AR experience (1..1 from class diagram)
    },
    modelFile: {
      type: String,
      required: [true, "3D model file URL is required"], // URL to .glb or .gltf file in Cloudinary/S3
    },
    markerType: {
      type: String,
      required: [true, "Marker type is required"],
      enum: ["marker-based", "markerless", "image-tracking"],
      // marker-based: uses printed AR.js markers
      // markerless: uses WebXR SLAM surface detection
      // image-tracking: uses destination photo as the marker
    },
    markerImageUrl: {
      type: String,
      default: null, // Only needed for image-tracking type
    },
    infoOverlay: {
      // JSON object for the information panel shown in AR
      title: { type: String, default: "" },
      shortDescription: { type: String, default: "" },
      historicalFact: { type: String, default: "" },
      audioGuideUrl: { type: String, default: null },
    },
    filterAssets: {
      // AR photo filters with Sri Lankan cultural themes (FR-09)
      type: [String], // Array of filter image URLs
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true, // Can disable AR for a destination without deleting
    },
    supportedDevices: {
      type: [String],
      enum: ["android-chrome", "ios-safari", "desktop-chrome", "desktop-firefox"],
      default: ["android-chrome", "ios-safari"],
    },
    loadTime: {
      type: Number,
      default: null, // Recorded average load time in ms during testing
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookup by destination
arExperienceSchema.index({ destinationId: 1 });

// Index for active AR experiences
arExperienceSchema.index({ isActive: 1 });

const ARExperience = mongoose.model("ARExperience", arExperienceSchema);

module.exports = ARExperience;