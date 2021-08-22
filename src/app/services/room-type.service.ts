import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RoomType } from '../models/roomType';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  
  constructor(private httpClient: HttpClient) {


   }
   getRoomTypes() : Observable<RoomType[]>{
     
    return this.httpClient.get<RoomType[]>(`http://localhost:3000/roomTypes`);      

   }
}
