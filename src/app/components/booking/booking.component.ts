import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { debounceTime, switchMap, startWith, tap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel';
import {RoomTypeService} from 'src/app/services/room-type.service';
import { RoomType } from 'src/app/models/roomType';
import { Food } from 'src/app/models/food';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit{
  
  //properties
  formGroup : FormGroup  ;
  cities: City[] = []; 
  hotels: Hotel[] = []; 
  roomTypes:RoomType[] = [];
  isCitiesLoading : boolean = false;
  minAdults: number = 1; 
  maxAdults : number = 2; 
  minChildren : number = 0; 
  maxChildren: number = 2; 
  allDineIn:any[] = [
    {id:1,dineInName:'Breakfast'},
    {id:2,dineInName:'Lunch'},
    {id:3,dineInName:'Dinner'}
  ];

  allFoods: Food[] = [
    {name:"Fries"},
    {name:"Burger"},
    {name:"Chicken Combo"},
    {name:"Family Meal"},
    {name:"Non Veg Plater"},
    {name:"BBQ Burger"},
    {name:"Pizza"},
  ]; 
  

  foods: Food[] = [
    {name:"Fries"}
  ];

  filteredFoods : Observable<Food[]> ;
  

  @ViewChild("foodInput") foodInput : ElementRef<HTMLInputElement>;

  separatedKeyCodes: number[] = [ENTER, COMMA];



  
  
  constructor(private cityService: CityService, private hotelService:HotelService, private roomTypeService: RoomTypeService) { 

    //formGroup
    this.formGroup = new FormGroup({
      searchHotel: new FormGroup({
        city: new FormControl( null , [Validators.required]),
        checkIn: new FormControl( null , [Validators.required]),
        checkOut: new FormControl( null , [Validators.required]),
        adults: new FormControl( 1 , [Validators.min(1)]),
        children: new FormControl( 0 , [Validators.min(0)]),
      }),
      chooseHotel: new FormGroup({
        hotel:new FormControl(null, [Validators.required])
      }),
      chooseRoom: new FormGroup({
        roomType : new FormControl("Standard Single Room", [Validators.required]),
        allDineIn:new FormControl(false),
        dineIn:new FormArray([]),
        foods: new FormControl(null)

      })
    })

    //add dineIn options
    this.allDineIn.forEach((dineIn) => {

      this.dineInFormArray?.push(new FormControl(false))

    })

    //chips with auto complete 
    this.filteredFoods = this.getFormControl("chooseRoom.foods")
    .valueChanges.pipe(
      startWith(''),
      map((food:string | null)=>{
        if(food){
          var filterValue = food.toLowerCase() ; 
          return this.allFoods.filter(food => food.name.toLowerCase().indexOf(filterValue) == 0)          
        }
        else{
          this.allFoods.slice();
        }
      })
    )

  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
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

    this.hotelService.getHotels().subscribe(
      (response: Hotel[]) => {
        this.hotels = response 
      },
      (error) => {
        console.log(error); 
      }
    )

 

    this.roomTypeService.getRoomTypes().subscribe(
      (response: RoomType[]) => {
        this.roomTypes = response;
      },
      (error) => {
        console.log(error); 
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
  

  add(event: MatChipInputEvent) : void{
    //add our food
    if((event.value || '').trim()){
      this.foods.push({name:event.value.trim()}); 
    }
    this.getFormControl("chooseRoom").patchValue({foods:null}); 
    this.foodInput.nativeElement.value = ''; 
  }

  remove(food: Food):void{

    let index = this.foods.indexOf(food); 
    if(index>=0){
      this.foods.splice(index , 1); 
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void{
    this.foods.push({name: event.option.viewValue});
    this.getFormControl("chooseRoom").patchValue({foods:null});
    this.foodInput.nativeElement.value =''; 
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

  //choose hotel
  chooseHotel(hotel: Hotel){

    this.getFormControl("chooseHotel").patchValue({hotel:hotel.hotelName})

  }

  get dineInFormArray() : FormArray | null {
    return this.formGroup.get("chooseRoom.dineIn") as FormArray
  }
  isAllDineInSelected(){
    //if [true, true, true] then return true
    return this.dineInFormArray?.value.every((val : any) => val === true);
  }
  isNoDineInSelected(){
    //if [false, false , false] then return true
    return this.dineInFormArray?.value.every((val : any) => val === false); 

  }

  onAllDineInCheckboxChange(){

    this.allDineIn.forEach((dineIn,index)=>
    {
      this.dineInFormArray?.at(index).patchValue(this.getFormControl("chooseRoom.allDineIn").value); 
    }
    )     
  }

  //executes when user checks/ unchecks any of the three checkboxes
  onDineInChange(index){
    if(this.isAllDineInSelected()){
      this.getFormControl("chooseRoom").patchValue({allDineIn:true}); 
    }
    else if(this.isNoDineInSelected())
    {
      this.getFormControl("chooseRoom").patchValue({allDineIn:false}); 
    }   
  }



}
