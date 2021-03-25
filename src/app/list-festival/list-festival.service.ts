import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface ListFestivals {
  name: string;
  date: any;
  isActive: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ListFestivalService {
  configUrl = 'assets/config.json';
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }
 

  getConfig2() {
    return this.http.get<ListFestivals>(this.configUrl);
  }

}
