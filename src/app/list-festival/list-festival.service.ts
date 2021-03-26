import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Festival } from './festival';


@Injectable({
  providedIn: 'root'
})
export class ListFestivalService {
  configUrl = 'http://localhost:3000/festival';
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }
 

  getFestivals() {
    return this.http.get<Festival[]>(this.configUrl);
  }

  addFestival(festival: Festival): Observable<Festival> {
    return this.http.post<Festival>(this.configUrl, festival) ;
  }

}
