import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { Invoice } from './invoice';


const GET_INVOICES_URL = `${API_URL}/reservation/invoices`;
const UPDATE_INVOICE_URL = (invoiceId: number) => `${API_URL}/invoice/${invoiceId}`;

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) { }

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(GET_INVOICES_URL);
    }

    updateInvoice(
        invoiceId: number,
        price: number,
        discount: number,
        sentDate: Date,
        paymentDate: Date
    ) {
        return this.http.patch(UPDATE_INVOICE_URL(invoiceId), {
            price,
            discount,
            sentDate,
            paymentDate
        });
    }
}
