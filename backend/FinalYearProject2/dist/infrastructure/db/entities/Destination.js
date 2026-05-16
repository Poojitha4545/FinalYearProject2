"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const destinationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Destination name is required"],
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["cultural", "beaches", "wildlife", "adventure", "food", "accommodation"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    region: {
        type: String,
        required: [true, "Region is required"],
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: [true, "Coordinates are required"],
        },
    },
    images: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    visitorInfo: {
        openingHours: { type: String, default: "" },
        entryFee: { type: String, default: "Free" },
        bestTimeToVisit: { type: String, default: "" },
        accessibility: { type: String, default: "" },
    },
    arModelUrl: {
        type: String,
        default: null, // URL to the 3D model file in cloud storage
    },
    rating: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
// Geospatial index for location-based queries (finding nearby destinations)
destinationSchema.index({ location: "2dsphere" });
// Text index for search functionality
destinationSchema.index({ name: "text", description: "text", tags: "text" });
// Index for category filtering
destinationSchema.index({ category: 1 });
const Destination = mongoose_1.default.model("Destination", destinationSchema);
module.exports = Destination;
//# sourceMappingURL=Destination.js.map