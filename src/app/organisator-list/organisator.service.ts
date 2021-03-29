import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Organisator } from './organisator';
@Injectable({
  providedIn: 'root'
})
export class OrganisatorService {

  organisatorUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getOrganisators(): Observable<Organisator[]> {
      return this.http.get<Organisator[]>(this.organisatorUrl
        );
  }
  addUser(user: Organisator): Observable<Organisator> {
    return this.http.post<Organisator>(this.organisatorUrl, user) ;
  }
}
