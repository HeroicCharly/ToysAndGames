import { Observable } from 'rxjs/Observable';

/** Represents a response from the server. */
export interface ApiResponse<T> {
    /** Data of type T that the response contains. */
    data: T;
    /** Any additional message regarding the request. */
    message: string;
    /** Status of the request. */
    status: string;
    /** HTTP status code of the request. */
    statusCode: number;
}

export interface ServiceResponse<T> extends Observable<ApiResponse<T>> { }