import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './zone';
import { Game} from '../game-list/game';
import { API_URL } from 'src/environments/environment';

const CURRENT_AREAS_URL = `${API_URL}/festival/current/areas`;
const CREATE_AREA_URL = `${API_URL}/area`
@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  //zoneURL = 'http://localhost:3000/area';

  constructor(private http: HttpClient) { }
  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(CURRENT_AREAS_URL);
}

getGamesForArea(id: number): Observable<Game[]>{

  let url = 'http://localhost:3000/reserved-game/area/' + id;

  return this.http.get<Game[]>(url);
}

addZone(label: string, festivalId: number){
  return this.http.post(CREATE_AREA_URL, {label,festivalId})
}


}
