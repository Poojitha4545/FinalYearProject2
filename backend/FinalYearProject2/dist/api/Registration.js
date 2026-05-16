"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Registration_1 = require("../application/Registration");
const RegistrationRouter = express_1.default.Router();
RegistrationRouter
    .route('/')
    .post(Registration_1.register);
RegistrationRouter
    .route('/login')
    .post(Registration_1.login);
exports.default = RegistrationRouter;
//# sourceMappingURL=Registration.js.map