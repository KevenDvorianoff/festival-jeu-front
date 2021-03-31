import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { Contact } from './contact';

const CREATE_CONTACT_URL = `${API_URL}/contact`;
const GET_CONTACT_URL = `${API_URL}/contact`;
const UPDATE_CONTACT_URL = (contactId: number) => `${API_URL}/contact/${contactId}`;
const DELETE_CONTACT_URL = (contactId: number) => `${API_URL}/contact/${contactId}`;

@Injectable()
export class ContactService { 

    constructor(private http: HttpClient) { }

    createContact(
        isPrincipal: boolean,
        firstname: string,
        lastname: string,
        email: string,
        personalPhone: string,
        workPhone: string,
        street: string,
        city: string,
        postalCode: string,
        fonction: string){
        return this.http.post(CREATE_CONTACT_URL, {
            isPrincipal,
            firstname,
            lastname,
            email,
            personalPhone,
            workPhone,
            street,
            city,
            postalCode,
            fonction
        });
    } 

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(GET_CONTACT_URL);
    }

    updateContact(
        id: number,
        isPrincipal: boolean,
        firstname: string,
        lastname: string,
        email: string,
        personalPhone: string,
        workPhone: string,
        street: string,
        city: string,
        postalCode: string,
        fonction: string
        ) {
        return this.http.patch(UPDATE_CONTACT_URL(id), {
            id,
            isPrincipal,
            firstname,
            lastname,
            email,
            personalPhone,
            workPhone,
            street,
            city,
            postalCode,
            fonction
        });
    }

    deleteGame(contactId: number) {
        return this.http.delete(DELETE_CONTACT_URL(contactId));
    }
}