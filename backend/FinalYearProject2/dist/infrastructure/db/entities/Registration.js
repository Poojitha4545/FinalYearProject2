"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const registrationSchema = new mongoose_1.default.Schema({
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
const Registration = mongoose_1.default.model("Registration", registrationSchema);
exports.default = Registration;
//# sourceMappingURL=Registration.js.map