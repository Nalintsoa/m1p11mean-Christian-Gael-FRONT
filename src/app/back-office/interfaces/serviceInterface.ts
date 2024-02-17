export interface IService {
    _id?: string,
    name: string,
    price: number,
    duration: string,
    commission: number,
    description?: string,
    category: string,
    path?: string,
}

export interface IFilterService {
    keyword: string,
    price?: string,
    category?: string
}