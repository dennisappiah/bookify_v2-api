"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = void 0;
const mongoose_1 = require("mongoose");
const validateObjectId = (req, res, next) => {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send("Invalid ID");
    next();
};
exports.validateObjectId = validateObjectId;
