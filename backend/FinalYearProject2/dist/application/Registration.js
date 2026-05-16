"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Registration_1 = __importDefault(require("../infrastructure/db/entities/Registration"));
const Registration_2 = __importDefault(require("../domain/dto/Registration"));
const register = async (req, res, next) => {
    try {
        const parsed = Registration_2.default.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }
        const { fullName, email, password, country, interests, termsAccepted, newsletter } = parsed.data;
        const existing = await Registration_1.default.findOne({ email });
        if (existing) {
            res.status(409).json({ message: "Email already registered" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = await Registration_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            country,
            interests,
            termsAccepted,
            newsletter,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                country: user.country,
                interests: user.interests,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await Registration_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                country: user.country,
                interests: user.interests,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//# sourceMappingURL=Registration.js.map