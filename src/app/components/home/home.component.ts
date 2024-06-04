import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../servizi/api.service';
import { Airport } from '../../model/airport.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  flightForm!: FormGroup;
  originAirport!: Airport | null;
  destinationAirport!: Airport | null;
  airport!: Airport | null;
  query: string = '';
  results: any;
  footprintResults: any = {};
  footprint!: number
  risultatoFootprint: any
  numeroPasseggeri!: number;


  constructor(private formBuilder: FormBuilder, private apiservice: ApiService) { }


  ngOnInit(): void {
    // controllo form
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
    // console.log(this.flightForm.value);

  }


  getOriginAirport(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toUpperCase();
    // console.log(query);

    if (query.length > 0) {
      this.apiservice.getAirport(query).subscribe((data: any) => {
        this.results = data;
        // console.log('aeroporti:', this.results);
        if (data && data.data) {
          this.originAirport = data.data;
          // console.log('attributi aeroporto:', this.originAirport?.attributes);
          // console.log('id aeroporto:', this.originAirport?.id);
        } else {
          console.error('Errore nel caricamento degli aeroporti', data);
          this.originAirport = null;
        }
      });
    } else {
      this.originAirport = null;
    }
  }

  getDestinationAirport(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toUpperCase();
    // console.log(query);

    if (query.length > 0) {
      this.apiservice.getAirport(query).subscribe((data: any) => {
        this.results = data;
        // console.log('aeroporti:', this.results);
        if (data && data.data) {
          this.destinationAirport = data.data;
          // console.log('attributi aeroporto:', this.destinationAirport?.attributes);
          // console.log('id aeroporto:', this.destinationAirport?.id);
        } else {
          console.error('Errore nel caricamento degli aeroporti', data);
          this.destinationAirport = null;
        }
      });
    } else {
      this.destinationAirport = null;
    }
  }

  selectOriginAirport(originAirport: Airport) {
    const iata = originAirport.attributes.iata;
    // const name = originAirport.attributes.name;
    // const city = originAirport.attributes.city;
    this.query = `${iata}`;
    this.flightForm.patchValue({
      origin0: this.query,
    });
    // console.log(this.query);
    this.originAirport = null;
  }


  selectDestinationAirport(destinationAirport: Airport) {
    const iata = destinationAirport.attributes.iata;
    // const name = destinationAirport.attributes.name;
    // const city = destinationAirport.attributes.city;
    this.query = `${iata}`;
    this.flightForm.patchValue({
      destination0: this.query,
    });
    // console.log(this.query);
    this.destinationAirport = null;
  }



  onSubmit() {
    // dati presi dall'input
    const origin0 = this.flightForm.value.origin0;
    const destination0 = this.flightForm.value.
      destination0;
    const origin1 = this.flightForm.value.destination0;
    const destination1 = this.flightForm.value.origin0;
    const cabin_class = this.flightForm.value.cabin_class;
    const numeroPasseggeri = this.flightForm.value.numeroPasseggeri;
    const currency1 = this.flightForm.value.currency1;
    const currency2 = this.flightForm.value.currency2;
    // console.log('onSubmit effettuato:', origin0, destination0, origin1, destination1, numeroPasseggeri, currency1, currency2, cabin_class);

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
      // console.log('footprint x1 persona:', this.footprint);
    });


    setTimeout(() => {
      const calcoloFootprint = this.moltiplicaPasseggeri(this.footprint, numeroPasseggeri);
      this.risultatoFootprint = calcoloFootprint;
      this.numeroPasseggeri = numeroPasseggeri;
    }, 1000);

    setTimeout(() => {
      this.flightForm.reset();
    }, 10000);
  }

  moltiplicaPasseggeri(footprint: number, numeroPasseggeri: number) {
    if (numeroPasseggeri > 1) {
      const risultatoFootprint = footprint * numeroPasseggeri;
      // console.log('footprint:', footprint);
      // console.log('numero di passeggeri:', numeroPasseggeri);
      // console.log('risultato moltiplicato per numero di passeggeri: ', risultatoFootprint);
      return risultatoFootprint
    } else {
      if (this.risultatoFootprint === null) {
        alert("errore")
      } else {
        return this.risultatoFootprint
      }
    }

  }
}




