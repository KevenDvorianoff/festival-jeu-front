import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Editeur } from './editeur';
import { GameService } from '../game-list/game.service';
import { Game } from '../game-list/game';
import { Contact } from '../contacts/contact';


@Injectable({
  providedIn: 'root'
})
export class EditeursService {
  editeurUrl = 'http://localhost:3000/company';

  constructor(private http: HttpClient) { }

  getEditeurs(
    isPublisher?: boolean,
    isExhibitor?: boolean,
    isActive?: boolean
  ): Observable<Editeur[]> {
    const params = new HttpParams()

    if (isPublisher !== undefined) {
      params.set("isPublisher", isPublisher ? "true" : "false")
    }
    if (isExhibitor !== undefined) {
      params.set("isExhibitor", isExhibitor ? "true" : "false")
    }
    if (isActive !== undefined) {
      params.set("isActive", isActive ? "true" : "false")
    }

    return this.http.get<Editeur[]>(this.editeurUrl, { params: params});
  }

  getGamesForEditeur(id: number): Observable<Game[]> {

    const url = 'http://localhost:3000/game/company/' + id;

    return this.http.get<Game[]>(url);
  }

addEditeur(name: string,
  address: string,
  isActive: boolean,
  isExhibitor: boolean,
  isPublisher: boolean
  ){
    return this.http.post(this.editeurUrl, {
      name,
      address,
      isExhibitor,
      isPublisher,
      isActive
    });
}

editEditeur(id: number,
  name: string,
  address: string,
  isActive: boolean,
  isExhibitor: boolean,
  isPublisher: boolean
  ){

    const url = this.editeurUrl+"/"+id
    
    return this.http.patch(url, {
      name,
      address,
      isExhibitor,
      isPublisher,
      isActive
    });
}
 
  getContactForCompany(id: number): Observable<Contact[]> {
    const url = 'http://localhost:3000/contact/company/' + id;

    return this.http.get<Contact[]>(url);
  }

  getEditeur(id: number) : Observable<Editeur> {

    const url = this.editeurUrl + "/" + id

    return this.http.get<Editeur>(url);

  }

}
