import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { City } from '../models/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  //constructor
  constructor(private httpClient : HttpClient) { }


  getCities(searchText: string) : Observable<City[]>{
    return this.httpClient.get<City[]>(`http://localhost:3000/cities?cityName_like=^${searchText}`);
  }
}
