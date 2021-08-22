import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) {

   }
   getHotels():Observable<Hotel[]>{
     return this.httpClient.get<Hotel[]>(`http://localhost:3000/hotels`); 
   }
}
