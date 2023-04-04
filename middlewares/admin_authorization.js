"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = (req, res, next) => {
    if (!req.user.isAdmin)
        return res.status(403).send('Access denied. Forbidden');
    next();
};
exports.default = admin;
