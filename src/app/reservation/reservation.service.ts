import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  resaURL = 'http://localhost:3000/reservation';

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.resaURL)
}

getResaForFestival(id: number): Observable<Reservation[]>{
  
  var url = 'http://localhost:3000/game/company/' + id;
  
  return this.http.get<Reservation[]>(url)
}

addReservation(reservation: Reservation): Observable<Reservation> {
  return this.http.post<Reservation>(this.resaURL, reservation) ;
}

}

