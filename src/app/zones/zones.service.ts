import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './zone';
import { Game } from '../game-list/game';
import { API_URL } from 'src/environments/environment';

const CURRENT_AREAS_URL = `${API_URL}/festival/current/areas`;
const CREATE_AREA_URL = `${API_URL}/area`;
const GET_GAMES_AREA_URL = (areaId: number) => `${API_URL}/reserved-game/area/${areaId}`;

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }
  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(CURRENT_AREAS_URL);
  }

  getGamesForArea(id: number): Observable<Game[]> {

    return this.http.get<Game[]>(GET_GAMES_AREA_URL(id));
  }

  addZone(label: string, festivalId: number) {
    return this.http.post(CREATE_AREA_URL, { label, festivalId })
  }


}
