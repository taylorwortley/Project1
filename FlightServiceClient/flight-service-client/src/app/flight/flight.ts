import { Passenger } from "../passenger/passenger";

export interface Flight {
    id: number;
    flightNumber: string;
    destination: string;
    departureDateTime: Date;
    arrivalDateTime: Date;
    departureAirport: string;
    arrivalAirport: string;
    maxCapacity: number;
    passengers: Passenger[];
}

export interface FlightDTO {
    flightNumber: string;
    destination: string;
    departureDateTime: Date;
    arrivalDateTime: Date;
    departureAirport: string;
    arrivalAirport: string;
    maxCapacity: number
}