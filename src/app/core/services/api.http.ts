import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@core/interfaces/http-response.interface';

@Injectable({
    providedIn: 'root',
})
export class ApiHttp {
    private _params: HttpParams = new HttpParams();
    private _responseType: string = 'json';

    constructor(private _httpClient: HttpClient) {}

    get(endpoint: string): Observable<any> {
        return this._httpClient
            .get<HttpResponse>(endpoint, this._createOptions())
            .pipe(map((response: HttpResponse) => this._extractData(response)));
    }

    param(key: string, value: string): ApiHttp {
        if (value != null) {
            this._params = this._params.append(key, value);
        }
        return this;
    }

    private _createOptions(): Object {
        const options: Object = {
            params: this._params,
            responseType: this._responseType,
            observe: 'response',
        };
        this._resetOptions();
        return options;
    }

    private _extractData(response: HttpResponse): any {
        return response.body;
    }

    private _resetOptions(): void {
        this._params = new HttpParams();
        this._responseType = 'json';
    }
}
