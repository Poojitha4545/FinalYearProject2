"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error("MongoDB connection string is not defined");
        }
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("Connected to the Database");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("MongoDB connection failed:", error.message);
            process.exit(1);
        }
    }
};
exports.default = connectDB;
//# sourceMappingURL=index.js.map