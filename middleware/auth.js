"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const { PRIVATE_KEY } = process.env;
const verifyAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization ? authorization.replace("Bearer ", "") : null;
        const userAuth = await jsonwebtoken_1.default.verify(token, PRIVATE_KEY);
        if (!token) {
            return res.status(403).json({ ok: false, msg: "No token" });
        }
        if (userAuth) {
            next();
        }
        else {
            res.status(403).json({ ok: false, msg: "No autorizado" });
        }
    }
    catch (err) {
        res.status(403).json({ ok: false, msg: "No autorizado" });
    }
};
exports.verifyAuth = verifyAuth;
const signToken = async (data) => {
    return await jsonwebtoken_1.default.sign(data, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
    });
};
exports.signToken = signToken;
