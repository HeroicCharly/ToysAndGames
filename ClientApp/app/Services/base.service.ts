// import { Response, Headers, URLSearchParams, ResponseContentType } from '@angular/http';
// import { AuthHttp } from 'angular2-jwt';
// import { saveAs } from 'file-saver';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// import { ApiResponse, ServiceResponse } from 'core/models';

// export class BaseService {
//     protected url: string;

//     constructor(private _http: AuthHttp, prefix: string) {
//         this.url = `${UDBAdminPortal.settings.apiUrl}/${prefix}`;
//     }

//     /**
//      * Get request
//      * @param {string} - endpoint - api endpoint
//      * @param {string} - serviceUrl - The serviceUrl to override the default
//      */
//     protected get<T>(endpoint?: string, queryParams?: any): ServiceResponse<T> {
//         const requestUrl = endpoint ? `${this.url}/${endpoint}` : this.url;
//         // search is the property name that it's used to send queryParams.
//         let search = this.transformParameters(queryParams);

//         return this._http
//             .get(requestUrl, { search })
//             .map(res => this.extractData<T>(res))
//             .catch(this.errorHandler);
//     }

//     /**
//      * Get request for external URLs.
//      * @param {string} - serviceUrl - The serviceUrl to override the default
//      */
//     protected getExternal<T>(serviceUrl: string): ServiceResponse<T> {
//         return this._http
//             .get(serviceUrl)
//             .map(res => this.extractData<T>(res))
//             .catch(this.errorHandler);
//     }

//     /**
//      * Post request
//      * @param {string} - endpoint - api endpoint
//      * @param {any} - data - Data to be sent to server
//      * @param {string} - auditReason - Audit reason for aplicable operations
//      */
//     protected post(endpoint: string, data: any, auditReason?: string): ServiceResponse<any> {
//         if (auditReason != null) {
//             let auditHeaders = new Headers();
//             this.appendAuditReasonHeaders(auditHeaders, auditReason);

//             return this._http.post(`${this.url}/${endpoint}`, data, { headers: auditHeaders })
//                 .map(res => this.extractData<any>(res))
//                 .catch(this.errorHandler);
//         }
//         return this._http.post(`${this.url}/${endpoint}`, data)
//             .map(res => this.extractData<any>(res))
//             .catch(this.errorHandler);
//     }

//     /**
//      * Put request
//      * @param {string} - endpoint - api endpoint
//      * @param {any} - data - Data to be sent to server
//      * @param {string} - auditReason - Audit reason for aplicable operations
//      */
//     protected put(endpoint: string, data: any, auditReason?: string): ServiceResponse<any> {
//         if (auditReason != null) {
//             let auditHeaders = new Headers();
//             this.appendAuditReasonHeaders(auditHeaders, auditReason);

//             return this._http.put(`${this.url}/${endpoint}`, data, { headers: auditHeaders })
//                 .map(res => this.extractData<any>(res))
//                 .catch(this.errorHandler);
//         }

//         return this._http.put(`${this.url}/${endpoint}`, data)
//             .map(res => this.extractData<any>(res))
//             .catch(this.errorHandler);
//     }

//     /**
//      * Downloads a file from the server.
//      * @param endpoint API endpoint from which the file should be retrieved.
//      * @returns A promise that can be resolved when the file has downloaded.
//      */
//     protected download(endpoint: string, queryParams?: any): Promise<any> {
//         // earch is the property name that it's used to send queryParams.
//         let search = this.transformParameters(queryParams);

//         return this._http
//             .get(`${this.url}/${endpoint}`, {
//                 responseType: ResponseContentType.Blob,
//                 search: search
//             })
//             .map(res => {
//                 const contentDisposition = res.headers.get('content-disposition');
//                 const filename = this.getFileNameFromHeader(contentDisposition);
//                 return { file: res.blob(), filename };
//             })
//             .toPromise()
//             .then((res) => {
//                 saveAs(res.file, res.filename);
//             });
//     }

//     /**
//      * Delete request
//      * @param {string} - endpoint - api endpoint
//      * @param {string} - auditReason - Audit reason for aplicable operations
//      */
//     protected delete(endpoint: string, auditReason?: string): ServiceResponse<any> {
//         if (auditReason != null) {
//             let auditHeaders = new Headers();
//             this.appendAuditReasonHeaders(auditHeaders, auditReason);

//             return this._http.delete(`${this.url}/${endpoint}`, { headers: auditHeaders })
//                 .map(res => this.extractData<any>(res))
//                 .catch(this.errorHandler);
//         }

//         return this._http.delete(`${this.url}/${endpoint}`)
//             .map(res => this.extractData<any>(res))
//             .catch(this.errorHandler);
//     }

//     /**
//      * Extracts the data from the HTTP request.
//      * @param res Response from the HTTP call.
//      */
//     protected extractData<T>(res: Response): ApiResponse<T> {
//         return res.json() || {};
//     }

//     protected errorHandler(err: Response): Observable<ApiResponse<any>> {
//         let body = <ApiResponse<any>>err.json();
//         let msg = `Status ${err.status}: "${body.message}" on url ${err.url}`;
//         return Observable.throw(body);
//     }

//     /**
//      * Append audit reason to current request header
//      * @param {Headers} - headers - Newly created headers to append audit reason
//      * @param {string} - auditReason - Audit reason for aplicable operations
//      */
//     private appendAuditReasonHeaders(headers: Headers, auditReason: string) {
//         headers.append('Audit_Reason', auditReason);
//     }

//     /**
//      * Gets the filename from the Content-Disposition header.
//      * @param header Content-Disposition header string.
//      * @returns File name as string.
//      */
//     private getFileNameFromHeader(header: string): string {
//         if (!header) return null;

//         let result: string = header.split(';')[1].trim().split('=')[1];

//         return result.replace(/"/g, '');
//     }

//     /**
//      * Transforms the given object into a URLSearchparams object.
//      * This is intended to be executed before a GET request.
//      * @param obj Object containing the data to be transformed.
//      * @returns URLSearchParams object containing the data to send.
//      */
//     private transformParameters(obj: any): URLSearchParams {
//         let urlSearchParams = new URLSearchParams();
//         for (let property in obj) {
//             let parameter = obj[property];

//             if (parameter instanceof Date) {
//                 let dateParam = parameter.toDateString();
//                 urlSearchParams.set(property, dateParam);
//             } else if (typeof parameter === 'object' && !Array.isArray(parameter)) {
//                 urlSearchParams.appendAll(this.transformParameters(parameter));
//             } else if (Array.isArray(parameter)) {
//                 parameter.forEach(value => urlSearchParams.append(property, value));
//             } else {
//                 urlSearchParams.set(property, parameter);
//             }
//         }

//         return urlSearchParams;
//     }
// }