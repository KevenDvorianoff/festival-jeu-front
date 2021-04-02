import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';
import { API_URL } from 'src/environments/environment';
import { TestComponentRenderer } from '@angular/core/testing';
import { Editeur } from '../editeurs/editeur';

const CREATE_RESERVATION_URL = `${API_URL}/reservation`;
const GET_RESERVATION_URL = `${API_URL}/reservation`;
const UPDATE_RESERVATION_URL = (resId: number) => `${API_URL}/reservation/${resId}`;
const DELETE_RESERVATION_URL = (resId: number) => `${API_URL}/reservation/${resId}`;


@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  constructor(private http: HttpClient) { 
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(GET_RESERVATION_URL);
}

addReservation(reservation: Reservation): Observable<Reservation> {
  return this.http.post<Reservation>(CREATE_RESERVATION_URL, reservation) ;
}

deleteReservation(reservationId: number) {
  return this.http.delete(DELETE_RESERVATION_URL(reservationId));
}


createReservation(
  companyId: number,
  isPlaced: boolean,
  isPresent: boolean,
  needVolunteers: boolean,
  date: Date,
  festivalId: number
){
  return this.http.post(CREATE_RESERVATION_URL, {
    comment: "Ajoutez un commentaire",
    needVolunteers,
    isPresent,
    isPlaced,
    reservationDate: date,
    festivalId,
    companyId
    
});
}

}

