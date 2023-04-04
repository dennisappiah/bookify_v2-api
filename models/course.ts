export default class Course {
    id: number
    constructor(
        public name: string, 
        ) {
        this.id = Date.now()
    }
}