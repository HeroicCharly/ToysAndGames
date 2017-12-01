import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { product } from '../models/product';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RequestOptions } from '@angular/http/src/base_request_options';

@Injectable()
export class ProductService {
    baseURL: string = 'http://localhost:5000/api/';
    constructor(private http: Http) { }

    public getAllProducts(): Observable<product[]> {
        //  TODO: Fix the "get" call. when using baseUrl appending the string, it crashes
        return this.http.get('http://localhost:5000/api/Product/GetAllProducts')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public saveProducts(body: object): Observable<product[]> {
        return this.http.post('http://localhost:5000/api/Product/SaveProducts', body)
            .map(
            (res: Response) => res.json()
            )
            .catch(
            (error: any) => Observable.throw(error.json().error || 'Server Error')
            );
    }

}