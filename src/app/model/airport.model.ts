// first response from api
export interface AirportResponse {
  data: Airport;
}

// airport have id, type and attributes
export interface Airport {
  id: string;
  type: string;
  attributes: AirportAttributes;
}

// airport attributes have city, iata and name
export interface AirportAttributes {
  city: string;
  iata: string;
  name: string;
}
