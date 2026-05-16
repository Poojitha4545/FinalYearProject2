"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const RegistrationDTO = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(100),
    country: zod_1.z.string().default("United States"),
    interests: zod_1.z.array(zod_1.z.enum(["culture", "beach", "wildlife", "adventure", "food"])).default([]),
    termsAccepted: zod_1.z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
    newsletter: zod_1.z.boolean().default(false),
});
exports.default = RegistrationDTO;
//# sourceMappingURL=Registration.js.map