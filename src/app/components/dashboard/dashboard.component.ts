import { BookingService } from '../../services/booking.service'
import { Booking } from 'src/app/models/booking';
import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {Chart} from 'angular-highcharts'; 
import { columnChartOptions } from 'src/app/charts/column-chart';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //properties
  dashboardGridCols: number = 4; 
  cardColspan: number = 2;   
  bookings:Booking[] = []; 
  columnChart: Chart = new Chart(columnChartOptions);
  
  constructor(private mediaObserver: MediaObserver, private bookingService: BookingService) { }

  ngOnInit(): void {
    //responsive dashboard 
    this.mediaObserver.asObservable().subscribe((media: MediaChange[])=>{
      console.log(media); 
      if(media.some(mediaChange => mediaChange.mqAlias === "lt-sm")){
        this.dashboardGridCols = 1;
        this.cardColspan = 1 ; 
      }
      else if(media.some(mediaChange => mediaChange.mqAlias === "lt-md")){
        this.dashboardGridCols = 2; 
        this.cardColspan = 2;
      }
      else {
        this.dashboardGridCols = 4; 
        this.cardColspan = 2; 
      }
    });

    // bookings
    
    this.bookingService.getBookings().subscribe(
      (response:any) => {
          this.bookings =  response; 
      },
      (error) => {

        console.log(error); 

      }
    ) 
    }

}
