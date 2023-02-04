"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const expressApp = async (app) => {
    try {
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use((0, cookie_parser_1.default)());
    }
    catch (error) {
        console.log(error);
    }
};
exports.expressApp = expressApp;
