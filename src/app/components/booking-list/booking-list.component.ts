import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import {MatTableDataSource} from '@angular/material/table'
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import {SelectionModel } from "@angular/cdk/collections"; 


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  //properties
  formGroup : FormGroup ; 
  bookings: MatTableDataSource<Booking> = null ; 
  columnsToDisplay = ['select', 'customerName', 'checkIn', 'status', 'roomType', 'phone', 'actions'];

  bookingLoadingStatus : string = "Loading..."; 
  isLoadingCompleted: boolean = false; 
  isError : boolean = false; 
  rows : Booking[] = []; 
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort; 
  selection: SelectionModel<Booking> = new SelectionModel<Booking>(true, []); 

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
        this.bookings.paginator = this.paginator; 
        this.bookings.sort = this.sort; 
        this.bookings.filterPredicate = (data, filter) => {

          return this.columnsToDisplay.some((column,i) => {
            return column != 'actions' && column !="select" && data[column] && data[column].toString().toLowerCase().indexOf(filter)!=-1; 
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
  isAllSelected(){
    if(this.bookings){
      const numSelected = this.selection.selected.length;
      const numRows = this.bookings.data.length; 
      return numSelected == numRows; 
    }
    return false; 
  }
  masterToggle(){
    if(this.bookings){
      if(this.isAllSelected()){
        this.selection.clear(); 
      }
      else 
      {
        this.bookings.data.forEach(row => this.selection.select(row))
      }
    }
  }
}
