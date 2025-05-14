export interface Ticket {
  id: string,
  airline: string,
  from: string,
  to: string,
  departureTime: number,
  price?: number,
  duration: string,
  arrivalTime: number;
  terminal?: string;
  gate?: string;
  flightNumber?: string;

}