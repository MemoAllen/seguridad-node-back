"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keysScripts_1 = __importDefault(require("../config/keysScripts"));
const checkJwt = (req, res, next) => {
    const token = req.headers["auth"];
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, keysScripts_1.default.keys.secret);
        res.locals.jwtPayload = jwtPayload;
        const { iat, exp } = jwtPayload, newUser = __rest(jwtPayload, ["iat", "exp"]);
        const newToken = jsonwebtoken_1.default.sign(newUser, keysScripts_1.default.keys.secret, {
            expiresIn: "1h",
        });
        res.setHeader("auth", newToken);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "no autorizado" });
    }
};
exports.checkJwt = checkJwt;
