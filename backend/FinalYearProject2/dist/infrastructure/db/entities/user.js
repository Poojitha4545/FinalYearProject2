"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
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
}, {
    timestamps: true,
});
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
const User = mongoose_1.default.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map