import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from '../models/pagination.model';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<M, C, U, F> {

    protected abstract apiUrl: string;

    constructor(private http: HttpClient) { }

    private toHttpParams(params: { [key: string]: any } = {}): HttpParams {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value !== undefined && value !== null) {
                httpParams = httpParams.set(key, value.toString());
            }
        });
        return httpParams;
    }
    create(dto: C): Observable<void> {
        return this.http.post<void>(this.apiUrl, dto);
    }

    findAll(params?:  F & PaginationModel): Observable<PaginatedResponse<M[]>> {
        return this.http.get<PaginatedResponse<M[]>>(this.apiUrl, {
            params: this.toHttpParams(params)
        });
    }

    findOne(id: string): Observable<M> {
        return this.http.get<M>(`${this.apiUrl}/${id}`);
    }

    update(id: string, dto: U): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}