import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { AirportResponse } from '../model/airport.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getFlightFootprint with the correct URL and headers', () => {
    const params = {
      'segments[0][origin]': 'JFK',
      'segments[0][destination]': 'LAX',
      'segments[1][origin]': 'LAX',
      'segments[1][destination]': 'JFK',
      'cabin_class': 'economy',
      'currencies[]': ['USD', 'EUR']
    };

    const username = "847cd0f439539b7197569659";
    const password = "";
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    service.getFlightFootprint(params).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === service.flightFootprintUrl &&
      request.headers.get('Authorization') === headers.get('Authorization') &&
      request.params.has('segments[0][origin]') &&
      request.params.get('segments[0][origin]') === 'JFK' &&
      request.params.has('segments[0][destination]') &&
      request.params.get('segments[0][destination]') === 'LAX'
    );

    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a response
  });

  it('should call getAirport with the correct URL and headers', () => {
    const origin0 = 'JFK';
    const headers = new HttpHeaders({
      Authorization: `Bearer Bc36s1U6PEXv4SybJxPevNEy`,
    });

    service.getAirport(origin0).subscribe((response: AirportResponse) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.idAirportUrl}${origin0}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(headers.get('Authorization'));

    const mockAirportResponse: AirportResponse = {
      data: {
        id: '123',
        attributes: {
          iata: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
        },
        type: ''
      }
    };

    req.flush(mockAirportResponse); // Simulate a response
  });
});
