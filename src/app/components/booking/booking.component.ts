import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { debounceTime, switchMap, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  //properties
  formGroup : FormGroup  ;
  cities: City[] = []; 
  isCitiesLoading : boolean = false;
  minAdults: number = 1; 
  maxAdults : number = 2; 
  minChildren : number = 0; 
  maxChildren: number = 2; 


  



  
  
  constructor(private cityService: CityService) { 

    //formGroup
    this.formGroup = new FormGroup({
      searchHotel: new FormGroup({
        city: new FormControl( null , [Validators.required]),
        checkIn: new FormControl( null , [Validators.required]),
        checkOut: new FormControl( null , [Validators.required]),
        adults: new FormControl( 1 , [Validators.min(1)]),
        children: new FormControl( 0 , [Validators.min(0)]),
      })
    })
  }




  ngOnInit(): void {

    //cities(autocomplete)

    this.getFormControl("searchHotel.city").valueChanges
    .pipe(
      
      //delay 500 ms after last value change
      debounceTime(500),

      //tap do something before making request
      tap(()=>{
        this.cities = [];
        this.isCitiesLoading = true; 
      }),
      
      //switchMap to make actual request 
      switchMap(value => this.cityService.getCities(value))
    )
    .subscribe(
      
      (response) => {
        this.cities = response; 
        this.isCitiesLoading = false ;
      },

      (error) => {
        console.log(error);
        this.isCitiesLoading = false ;
      }
    )


  }


  //increase adults
  increaseAdults(){
    if(this.formGroup.value.searchHotel.adults < this.maxAdults)
    {
      //getting form group
      this.getFormControl("searchHotel").patchValue({
        adults: this.formGroup.value.searchHotel.adults + 1 
       }); 
    }
  }
  //decrease adults
  decreaseAdults(){
    if(this.formGroup.value.searchHotel.adults > this.minAdults)
    {
      //getting form group
      this.getFormControl("searchHotel").patchValue({
        adults: this.formGroup.value.searchHotel.adults - 1 
       }); 
    }
  }
  //increase children
  increaseChildren(){
    if(this.formGroup.value.searchHotel.children < this.maxChildren)
    {
      //getting form group
      this.getFormControl("searchHotel").patchValue({
        children: this.formGroup.value.searchHotel.children + 1 
       }); 
    }
  }
  //decrease adults
  decreaseChildren(){
    if(this.formGroup.value.searchHotel.children > this.minChildren)
    {
      //getting form group
      this.getFormControl("searchHotel").patchValue({
        children: this.formGroup.value.searchHotel.children - 1 
       }); 
    }
  }

  getFormControl(controlName:string) : FormControl {
    return this.formGroup.get(controlName) as FormControl; 
  }

  getErrorMessage(controlName: string, errorType:string):string{

    let errorMessage : string = "";
    switch(controlName){
      case 'city':
        {
          if(errorType == 'required') errorMessage = "You must choose a <strong>City</strong>";
          break; 
        }
      case 'checkIn':{
        if(errorType == 'required') errorMessage = "You must choose a <strong>Check-In Date</strong>"
        break;
      }
      case 'checkOut':{
        if(errorType == 'required') errorMessage = "You must choose a <strong>Check-Out Date</strong>"
        break; 
      }

      
    }
    return errorMessage; 

  }

}
