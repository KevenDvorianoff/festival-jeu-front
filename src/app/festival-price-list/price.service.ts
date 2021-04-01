import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { Price } from './price';

const CREATE_PRICE_URL = `${API_URL}/price`;
const GET_PRICES_URL = (festivalId: number) => `${API_URL}/festival/${festivalId}/prices`;
const UPDATE_PRICE_URL = (priceId: number) => `${API_URL}/price/${priceId}`;

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private http: HttpClient) { }

    createPrice(
        label: string,
        festivalId: number
    ) {
        return this.http.post(CREATE_PRICE_URL, {
            label,
            tableCount: 0,
            m2Count: 0,
            m2Price: 0,
            tablePrice: 0,
            festivalId
        });
    }

    getPrices(festivalId: number): Observable<Price[]> {
        return this.http.get<Price[]>(GET_PRICES_URL(festivalId));
    }

    updatePrice(
        priceId: number,
        label: string,
        tableCount: number,
        m2Count: number,
        m2Price: number,
        tablePrice: number
    ) {
        return this.http.patch(UPDATE_PRICE_URL(priceId), {
            label,
            tableCount,
            m2Count,
            m2Price,
            tablePrice
        });
    }

}
