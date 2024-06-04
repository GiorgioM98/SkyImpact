import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirportResponse } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // footprint url
  flightFootprintUrl = 'https://api.goclimate.com/v1/flight_footprint';
  // database airport url
  idAirportUrl = 'https://airportgap.com/api/airports/';

  constructor(private http: HttpClient,) { }


  // footprint flights
  getFlightFootprint(params: any): Observable<any> {
    // auth basic
    const username = "847cd0f439539b7197569659";
    const password = "";
    // headers
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });
    return this.http.get(this.flightFootprintUrl, {
      headers: headers,
      params: params
    });
  }


  // get iato airport
  getAirport(origin0: string): Observable<AirportResponse> {
    // headers, bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer Bc36s1U6PEXv4SybJxPevNEy`,
    });
    return this.http.get<AirportResponse>(`${this.idAirportUrl}${origin0}`, { headers });
  }
}
