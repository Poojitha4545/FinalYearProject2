"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userContentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: false, // ← change this
        default: null
    },
    destinationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Destination",
        required: false,
        default: null,
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
    location: {
        type: String,
        default: "",
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
            type: [mongoose_1.default.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
    },
    comments: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Index for fetching content by destination
userContentSchema.index({ destinationId: 1 });
// Index for fetching content by user
userContentSchema.index({ userId: 1 });
// Index for moderation queue (admin dashboard)
userContentSchema.index({ status: 1 });
const UserContent = mongoose_1.default.model("UserContent", userContentSchema);
module.exports = UserContent;
//# sourceMappingURL=usercontent.js.map