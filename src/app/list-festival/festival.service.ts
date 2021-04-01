import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Festival } from './festival';
import { API_URL } from 'src/environments/environment';

const CREATE_FESTIVAL_URL = `${API_URL}/festival`;
const GET_FESTIVALS_URL = `${API_URL}/festival`;
const UPDATE_FESTIVAL_URL = (festivalId: number) => `${API_URL}/festival/${festivalId}`;
const DELETE_FESTIVAL_URL = (festivalId: number) => `${API_URL}/festival/${festivalId}`;

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  constructor(private http: HttpClient) { }

  createFestival(
    name: string,
    date: Date,
  ): Observable<Festival> {
    return this.http.post<Festival>(CREATE_FESTIVAL_URL, {
      name,
      date,
      isActive: false,
    });
  }

  getFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>(GET_FESTIVALS_URL);
  }

  updateFestival(
    festivalId: number,
    name: string,
    date: Date,
    isActive: boolean
  ) {
    return this.http.patch(UPDATE_FESTIVAL_URL(festivalId), {
      name,
      date,
      isActive
    });
  }

  deleteFestival(festivalId: number) {
    return this.http.delete(DELETE_FESTIVAL_URL(festivalId));
  }

}
