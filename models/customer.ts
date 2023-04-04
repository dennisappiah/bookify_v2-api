export default class CustomerModel {
    isGold: boolean
    constructor(public name: string, public phone: string) {
        this.isGold = false
    }
}