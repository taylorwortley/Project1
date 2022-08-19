import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Flight, FlightDTO } from './flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightUrl: string = `${environment.apiUrl}/Flights`;
  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightUrl);
  }

  getFlightsByPassenger(passengerId: number): Observable<Flight[]> {
    let url = `${this.flightUrl}/Passenger/${passengerId}`;
    return this.http.get<Flight[]>(url);
  }

  find(id: number): Observable<Flight> {
    let url = `${this.flightUrl}/${id}`;
    return this.http.get<Flight>(url);
  }

  edit(flight: Flight, id: number): Observable<Flight> {
    let url = `${this.flightUrl}/${id}`;
    return this.http.put<Flight>(url, flight);
  }

  add(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.flightUrl, flight);
  }

  remove(id: number): Observable<Flight> {
    return this.http.delete<Flight>(`${this.flightUrl}/${id}`);
  }
}
