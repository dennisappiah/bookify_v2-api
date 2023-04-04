"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
    }
}
exports.default = Course;
