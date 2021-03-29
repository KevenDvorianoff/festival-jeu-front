import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './zone';
import { Game} from '../game-list/game';
@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  zoneURL = 'http://localhost:3000/area';

  constructor(private http: HttpClient) { }
  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zoneURL);
}

getGamesForArea(id: number): Observable<Game[]>{

  let url = 'http://localhost:3000/game/area/' + id;

  return this.http.get<Game[]>(url);
}


}
