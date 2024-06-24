import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AirportResponse } from '../model/airport.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // footprint url
  flightFootprintUrl = 'https://api.goclimate.com/v1/flight_footprint';

  private airportsJson = '../assets/airports.json';

  constructor(private http: HttpClient,) { }


  // get all airports from json
  getAllAirports(city: string): Observable<any> {
    return this.http.get<any[]>(this.airportsJson).pipe(
      map((airports: any[]) => {
        return airports.filter(airport =>
          airport.city.toLowerCase().includes(city.toLowerCase())
        );
      })
    );
  }


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
}
