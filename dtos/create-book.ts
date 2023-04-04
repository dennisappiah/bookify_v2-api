import CategoryDto from "./create-category"

export default interface createBookDto {
    title: string
    category: CategoryDto
    numberInStock: number
    dailyRentalRate: number
}