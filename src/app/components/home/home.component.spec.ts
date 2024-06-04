import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { ApiService } from '../../servizi/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AirportResponse } from '../../model/airport.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [HomeComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct form title', () => {
    const formTitle = fixture.debugElement.query(By.css('.formContainer h1')).nativeElement;
    expect(formTitle.textContent).toContain('Calculate your footprint!');
  });

  it('should have all form fields and submit button', () => {
    const formFields = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(formFields.length).toBe(4); // 5 form fields

    const submitButton = fixture.debugElement.query(By.css('.btn')).nativeElement;
    expect(submitButton.textContent).toBe('Calculate now!');
  });

  it('should display origin airport suggestions', () => {
    const input = fixture.debugElement.query(By.css('input[name="origin0"]')).nativeElement;
    input.value = 'JFK';
    input.dispatchEvent(new Event('input'));

    spyOn(apiService, 'getAirport').and.returnValue(of({
      data: {
        id: 'some-id',
        type: 'some-type',
        attributes: {
          iata: 'LAX',
          name: 'Los Angeles International Airport',
          city: 'Los Angeles'
        }
      }
    }));

    component.getOriginAirport({ target: input } as Event);
    fixture.detectChanges();

    const airportList = fixture.debugElement.query(By.css('ul'));
    expect(airportList).toBeTruthy();
  });

  it('should display destination airport suggestions', () => {
    const input = fixture.debugElement.query(By.css('input[name="destination0"]')).nativeElement;
    input.value = 'LAX';
    input.dispatchEvent(new Event('input'));

    spyOn(apiService, 'getAirport').and.returnValue(of({
      data: {
        id: 'some-id',
        type: 'some-type',
        attributes: {
          iata: 'LAX',
          name: 'Los Angeles International Airport',
          city: 'Los Angeles'
        }
      }
    } as AirportResponse));
    component.getDestinationAirport({ target: input } as Event);
    fixture.detectChanges();

    const airportList = fixture.debugElement.query(By.css('ul'));
    expect(airportList).toBeTruthy();
  });

  it('should calculate footprint and display results', () => {
    spyOn(apiService, 'getFlightFootprint').and.returnValue(of({ footprint: 150 }));

    component.flightForm.setValue({
      origin0: 'JFK',
      destination0: 'LAX',
      origin1: 'LAX',
      destination1: 'JFK',
      cabin_class: 'economy',
      numeroPasseggeri: '1',
      currency1: 'USD',
      currency2: 'EUR'
    });

    component.onSubmit();
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const footprintResult = fixture.debugElement.query(By.css('.footprint'));
      expect(footprintResult.nativeElement.textContent).toContain('Here is the amount of CO2 produced by your air travel');
      expect(footprintResult.nativeElement.textContent).toContain('Footprint for a passenger: 150');
    }, 1000);
  });
});
