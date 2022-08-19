import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Passenger } from './passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private passengerUrl: string = `${environment.apiUrl}/Passengers`;
  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.passengerUrl);
  }

  getPassengersByFlight(flightId: number): Observable<Passenger[]> {
    let url = `${this.passengerUrl}/Flight/${flightId}`;
    return this.http.get<Passenger[]>(url);
  }

  find(id: number): Observable<Passenger> {
    let url = `${this.passengerUrl}/${id}`;
    return this.http.get<Passenger>(url);
  }

  edit(passenger: Passenger, id: number): Observable<Passenger> {
    let url = `${this.passengerUrl}/${id}`;
    return this.http.put<Passenger>(url, passenger);
  }

  add(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(this.passengerUrl, passenger);
  }

  remove(id: number): Observable<Passenger> {
    return this.http.delete<Passenger>(`${this.passengerUrl}/${id}`);
  }
}
