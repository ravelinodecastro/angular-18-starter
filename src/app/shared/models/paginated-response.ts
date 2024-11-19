export interface PaginatedResponse<T> {
    content: T,
    pageable: Pageable,
    last: boolean,
    totalElements: number,
    totalPages: number,
    first: boolean,
    size: number,
    number: number,
    sort: Sort,
    numberOfElements: number,
    empty: boolean
}
interface Pageable {
    pageNumber: number,
    pageSize: number,
    sort: Sort,
    offset: number,
    paged: boolean,
    unpaged: boolean
}
interface Sort {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
}
