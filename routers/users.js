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
const express_1 = require("express");
const userCollection_1 = require("./../schemas/userCollection");
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const router = (0, express_1.Router)();
// getting current user after authentication
router.get('/me', authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userCollection_1.User.findById(req.user._id).select('-password');
    res.send(user);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, userCollection_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //second validation: checking if  user is  already registered
    let user = yield userCollection_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User already registered');
    //user object 
    user = new userCollection_1.User(lodash_1.default.pick(req.body, ['name', 'email', 'password']));
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(user.password, salt);
    yield user.save();
    //setting jwt-token response header as part of the client response for subsequent auth/login requests
    const token = user.generateAuthToken();
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .status(201).send(lodash_1.default.pick(user, ['_id', 'name', 'email']));
}));
exports.default = router;
