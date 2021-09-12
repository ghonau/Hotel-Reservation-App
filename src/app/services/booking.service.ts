import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking'; 

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient : HttpClient) { 

    
  }

  getBookings(): Observable<Booking[]>{
    
    return this.httpClient.get<Booking[]>(`http://localhost:3000/bookings?_sort=checkIn&_order=desc`)
    .pipe(map(
              (bookings:any) => {
                bookings.forEach((booking:Booking) => {
                  
                  booking.checkIn = new Date(booking.checkIn);
                  booking.checkOut = new Date(booking.checkOut);
                  booking.dateOfBirth = new Date(booking.dateOfBirth);

                })

                return bookings; 
              }))
  }
  postBooking(booking) : Observable<Booking>{
    return this.httpClient.post<Booking>(`http://localhost:3000/bookings`, booking); 
  }

  putBooking(booking: Booking): Observable<Booking>{
    return this.httpClient.put<Booking>(`http://localhost:3000/bookings/${booking.id}`, booking)
  }

}


// booking.checkIn = new Date(booking.checkIn);
// booking.checkOut = new Date(booking.checkOut);
// booking.dateOfBirth = new Date(booking.dateOfBirth);

