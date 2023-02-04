"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// dotEnv.config()
if (process.env.NODE_ENV !== "prod") {
    console.log("prod");
    const configFile = `.env.${process.env.NODE_ENV}`;
    require("dotenv").config({
        path: configFile
    });
}
else {
    console.log("!prod");
    dotenv_1.default.config();
}
exports.PORT = process.env.PORT;
exports.DB_URL = process.env.DB_URL;
