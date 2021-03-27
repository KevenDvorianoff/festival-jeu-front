import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Organisator } from './organisator';
@Injectable({
  providedIn: 'root'
})
export class OrganisatorService {

  organisatorUrl = 'http://localhost:3000/account';

  constructor(private http: HttpClient) { }

  getOrganisators(): Observable<Organisator[]> {
      return this.http.get<Organisator[]>(this.organisatorUrl
        )
  }
  addAccount(account: Organisator): Observable<Organisator> {
    return this.http.post<Organisator>(this.organisatorUrl, account) ;
  }
}