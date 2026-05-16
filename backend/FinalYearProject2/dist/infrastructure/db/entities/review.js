"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    destinationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Destination",
        required: [true, "Destination ID is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
    comment: {
        type: String,
        required: [true, "Review comment is required"],
        trim: true,
        minlength: [10, "Comment must be at least 10 characters"],
        maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    editedAt: {
        type: Date,
        default: null,
    },
    isModerated: {
        type: Boolean,
        default: false, // Admin has reviewed this
    },
    helpfulVotes: {
        type: Number,
        default: 0, // Other users marking review as helpful
    },
}, {
    timestamps: true,
});
// Prevent a user from submitting more than one review per destination
reviewSchema.index({ userId: 1, destinationId: 1 }, { unique: true });
// Index for fetching all reviews for a destination
reviewSchema.index({ destinationId: 1 });
// Index for fetching all reviews by a user
reviewSchema.index({ userId: 1 });
// ===========================================================
// Middleware: Auto-update Destination average rating
// Runs after every save/delete of a Review document
// ===========================================================
reviewSchema.post("save", async function () {
    const Destination = mongoose_1.default.model("Destination");
    const stats = await mongoose_1.default.model("Review").aggregate([
        { $match: { destinationId: this.destinationId } },
        {
            $group: {
                _id: "$destinationId",
                avgRating: { $avg: "$rating" },
                count: { $sum: 1 },
            },
        },
    ]);
    if (stats.length > 0) {
        await Destination.findByIdAndUpdate(this.destinationId, {
            "rating.average": Math.round(stats[0].avgRating * 10) / 10,
            "rating.count": stats[0].count,
        });
    }
});
const Review = mongoose_1.default.model("Review", reviewSchema);
module.exports = Review;
//# sourceMappingURL=review.js.map