import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../servizi/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flightForm!: FormGroup;
  originAirport: any | null = null;
  destinationAirport: any | null = null;
  query: string = '';
  resultsOrigin: any[] = [];
  resultsDestination: any[] = [];
  footprintResults: any = {};
  footprint!: number;
  risultatoFootprint!: number;
  numeroPasseggeri: any;
  airports: any[] = [];
  originError: boolean = false;
  destinationError: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService) { }

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      origin0: ['', [Validators.required]],
      destination0: ['', [Validators.required]],
      origin1: ['', [Validators.required]],
      destination1: ['', [Validators.required]],
      cabin_class: ['economy', [Validators.required]],
      numeroPasseggeri: ['1', [Validators.required]],
      currency1: ['SEK', [Validators.required]],
      currency2: ['USD', [Validators.required]],
    });
  }

  getOriginAirport(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toUpperCase();

    if (query.length > 0) {
      this.apiservice.getAllAirports(query).subscribe((data: any) => {
        this.resultsOrigin = data;
        this.originError = this.resultsOrigin.length === 0;
        // console.log("results origin:", this.resultsOrigin);
      });
    }
  }

  getDestinationAirport(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toUpperCase();

    if (query.length > 0) {
      this.apiservice.getAllAirports(query).subscribe((data: any) => {
        this.resultsDestination = data;
        this.destinationError = this.resultsDestination.length === 0;
        // console.log("results destination:", this.resultsDestination);
      });
    }
  }

  selectOriginAirport(originAirport: any) {
    const iata = originAirport.code;
    this.query = `${iata}`;
    this.flightForm.patchValue({
      origin0: this.query,
    });
    this.originAirport = null;
    this.originError = false;
    this.resultsOrigin = [];
  }

  selectDestinationAirport(destinationAirport: any) {
    const iata = destinationAirport.code;
    this.query = `${iata}`;
    this.flightForm.patchValue({
      destination0: this.query,
    });
    this.destinationAirport = null;
    this.destinationError = false;
    this.resultsDestination = [];
  }

  onSubmit() {
    const origin0 = this.flightForm.value.origin0;
    const destination0 = this.flightForm.value.destination0;
    const origin1 = this.flightForm.value.destination0;
    const destination1 = this.flightForm.value.origin0;
    const cabin_class = this.flightForm.value.cabin_class;
    const numeroPasseggeri = this.flightForm.value.numeroPasseggeri;
    const currency1 = "SEK";
    const currency2 = "USD";
    console.log(origin0, destination0, origin1, destination1, cabin_class, numeroPasseggeri, currency1, currency2);

    const params = {
      'segments[0][origin]': origin0,
      'segments[0][destination]': destination0,
      'segments[1][origin]': origin1,
      'segments[1][destination]': destination1,
      'cabin_class': cabin_class,
      'currencies[]': [currency1, currency2]
    }

    this.apiservice.getFlightFootprint(params).subscribe((data: any) => {
      this.footprintResults = data;
      this.footprint = this.footprintResults.footprint;
      this.risultatoFootprint = this.moltiplicaPasseggeri(this.footprint, numeroPasseggeri);
    });

    this.numeroPasseggeri = numeroPasseggeri;
  }

  moltiplicaPasseggeri(footprint: number, numeroPasseggeri: number) {
    if (numeroPasseggeri > 2) {
      const risultatoFootprint = footprint * numeroPasseggeri;
      return risultatoFootprint;
    } else {
      return 0;
    }
  }
}
