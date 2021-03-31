import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './organisator';
import { API_URL } from 'src/environments/environment';

const GET_ORGANISATORS_URL = `${API_URL}/user`;
@Injectable({
  providedIn: 'root'
})

export class OrganisatorService {

  organisatorUrl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { }

  getOrganisators(): Observable<User[]> {
      return this.http.get<User[]>(GET_ORGANISATORS_URL);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.organisatorUrl, user) ;
  }
  deleteOrganisator(id: number): Observable<{}> {
    const url = `${this.organisatorUrl}/${id}`; 
    return this.http.delete(url)
  }
  updateOrganisateur(organisateur: User): Observable<User> {
    return this.http.put<User>(this.organisatorUrl, organisateur);
  }
}
