import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import {MatTableDataSource} from '@angular/material/table'
import {MatFormField } from '@angular/material/form-field'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  //properties
  formGroup : FormGroup ; 
  bookings: MatTableDataSource<Booking> = null ; 
  columnsToDisplay = ['customerName', 'checkIn', 'status', 'roomType', 'phone', 'actions'];

  bookingLoadingStatus : string = "Loading..."; 
  isLoadingCompleted: boolean = false; 
  isError : boolean = false; 
  rows : Booking[] = []; 
  
  constructor(private bookingService : BookingService) { 

    this.formGroup = new FormGroup ({
      search : new FormControl(null)
    })

    
  }

  filterBookings(){
    if(this.formGroup.value.search != null && this.bookings){
      
      this.bookings.filter = this.formGroup.value.search.trim() ; 


    }
  }

  clearFilter(){
    if(this.formGroup.value.search != null){

      this.formGroup.patchValue({search:''}); 
      this.filterBookings() ;

    }
  }

  ngOnInit(): void {

    this.isLoadingCompleted = false ;
    this.bookingService.getBookings().subscribe(
      (response ) => {
        this.bookings = new MatTableDataSource<Booking>(response); 
        this.rows = response; 
        this.isLoadingCompleted = true ;
        this.isError = false;

        this.bookings.filterPredicate = (data, filter) => {

          return this.columnsToDisplay.some((column,i) => {
            return column != 'actions' && column !="selection" && data[column] && data[column].toString().toLowerCase().indexOf(filter)!=-1; 
          })
        }

      },
      (error) => {
        console.log(error);
        this.isError= true; 
        this.bookingLoadingStatus = "Fetching booking data failed "; 
        this.isLoadingCompleted = true; 
      }
    )

   

  }

}
