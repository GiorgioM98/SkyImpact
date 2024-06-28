import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter airports based on city', () => {
    const mockAirports = [
      { city: 'Milan', code: 'MXP' },
      { city: 'New York', code: 'JFK' },
      { city: 'Milano', code: 'LIN' }
    ];

    service.getAllAirports('mil').subscribe((airports) => {
      expect(airports.length).toBe(2);
      expect(airports).toEqual([
        { city: 'Milan', code: 'MXP' },
        { city: 'Milano', code: 'LIN' }
      ]);
    });

    const req = httpTestingController.expectOne('../assets/airports.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAirports);
  });

  it('should return the flight footprint', () => {
    const mockFootprint = { footprint: 123 };
    const params = {
      'segments[0][origin]': 'MXP',
      'segments[0][destination]': 'JFK',
      'segments[1][origin]': 'JFK',
      'segments[1][destination]': 'MXP',
      'cabin_class': 'economy',
      'currencies[]': ['SEK', 'USD']
    };

    service.getFlightFootprint(params).subscribe((footprint) => {
      expect(footprint).toEqual(mockFootprint);
    });

    const req = httpTestingController.expectOne((request) => {
      return request.url === 'https://api.goclimate.com/v1/flight_footprint' &&
             request.params.get('segments[0][origin]') === 'MXP' &&
             request.params.get('segments[0][destination]') === 'JFK';
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Basic ' + btoa('847cd0f439539b7197569659:'));
    req.flush(mockFootprint);
  });
});
