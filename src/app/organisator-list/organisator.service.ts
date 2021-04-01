import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './organisator';
import { API_URL } from 'src/environments/environment';

const GET_ORGANISATORS_URL = `${API_URL}/user`;
const CREATE_ORGANISATOR_URL = `${API_URL}/user`;
const UPDATE_ORGANISATOR_URL = (organisatorId: number) => `${API_URL}/user/${organisatorId}`;
const DELETE_ORGANISATOR_URL = (organisatorId: number) => `${API_URL}/user/${organisatorId}`;


@Injectable({
  providedIn: 'root'
})

export class OrganisatorService {
  constructor(private http: HttpClient) { }

  createOrganisator(
    username: string,
    password: string,
    isAdmin: boolean,
    
) {
    return this.http.post(CREATE_ORGANISATOR_URL, {
        username,
        password,
        isAdmin
    });
} 

  getOrganisators(): Observable<User[]> {
      return this.http.get<User[]>(GET_ORGANISATORS_URL);
  }
  updateOrganisator(
    organisatorId: number,
    username: string,
    password: string,
    isAdmin: boolean
) {
    return this.http.patch(UPDATE_ORGANISATOR_URL(organisatorId), {
        username,
        password,
        isAdmin
    });
}

deleteOrganisator(organisatorId: number) {
    return this.http.delete(DELETE_ORGANISATOR_URL(organisatorId));
}
}
