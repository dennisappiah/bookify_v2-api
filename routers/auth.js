"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const express_1 = require("express");
const userCollection_1 = require("./../schemas/userCollection");
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, exports.validateAuth)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //second validation: checking if  user email does not exist
    let user = yield userCollection_1.User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password');
    //third  validation: checking if  user password does not exist
    const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password');
    // generate json web tokens to pass as response
    const token = user.generateAuthToken();
    //respond with Json Web Token(JWT)
    res.send(token);
}));
// implement logging out user on the client 
const validateAuth = (req) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(255).required(),
    });
    return schema.validate(req);
};
exports.validateAuth = validateAuth;
exports.default = router;
