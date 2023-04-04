"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RentalModel {
    constructor(customer, book, dateOut, dateReturned, rentalFee) {
        this.customer = customer;
        this.book = book;
        this.dateOut = dateOut;
        this.dateReturned = dateReturned;
        this.rentalFee = rentalFee;
    }
}
exports.default = RentalModel;
;
