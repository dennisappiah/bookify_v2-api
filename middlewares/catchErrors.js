"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = void 0;
const catchErrors = (fn) => {
    return (req, res, next) => {
        try {
            fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.catchErrors = catchErrors;
