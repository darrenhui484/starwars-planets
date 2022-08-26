export default interface IPaginatedResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<any>
}