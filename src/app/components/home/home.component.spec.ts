import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { ApiService } from '../../servizi/api.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [HomeComponent],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get origin airports', () => {
    const mockAirports = [{ city: 'Milan', code: 'MXP' }];
    spyOn(apiService, 'getAllAirports').and.returnValue(of(mockAirports));

    component.getOriginAirport({ target: { value: 'Mil' } } as any);

    expect(component.resultsOrigin).toEqual(mockAirports);
    expect(component.originError).toBeFalse();
  });

  it('should handle origin airport not found', () => {
    spyOn(apiService, 'getAllAirports').and.returnValue(of([]));

    component.getOriginAirport({ target: { value: 'XYZ' } } as any);

    expect(component.resultsOrigin.length).toBe(0);
    expect(component.originError).toBeTrue();
  });

  it('should get destination airports', () => {
    const mockAirports = [{ city: 'New York', code: 'JFK' }];
    spyOn(apiService, 'getAllAirports').and.returnValue(of(mockAirports));

    component.getDestinationAirport({ target: { value: 'New' } } as any);

    expect(component.resultsDestination).toEqual(mockAirports);
    expect(component.destinationError).toBeFalse();
  });

  it('should handle destination airport not found', () => {
    spyOn(apiService, 'getAllAirports').and.returnValue(of([]));

    component.getDestinationAirport({ target: { value: 'XYZ' } } as any);

    expect(component.resultsDestination.length).toBe(0);
    expect(component.destinationError).toBeTrue();
  });

  it('should calculate footprint on submit', () => {
    const mockFootprint = { footprint: 123 };
    spyOn(apiService, 'getFlightFootprint').and.returnValue(of(mockFootprint));
    component.flightForm.patchValue({
      origin0: 'MXP',
      destination0: 'JFK',
      cabin_class: 'economy',
      numeroPasseggeri: 3
    });

    component.onSubmit();

    expect(component.footprint).toBe(123);
    expect(component.risultatoFootprint).toBe(369); // 123 * 3
  });
});
