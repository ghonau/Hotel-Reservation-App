import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/booking';

import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-change-dates',
  templateUrl: './change-dates.component.html',
  styleUrls: ['./change-dates.component.css']
})
export class ChangeDatesComponent implements OnInit {

  formGroup : FormGroup ; 
  isWorking: boolean = false; 
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData : Booking, 
  private matSnackbar : MatSnackBar,
  public matDialogRef: MatDialogRef<ChangeDatesComponent>, 
  private bookingService:BookingService) { 
 
      this.formGroup = new FormGroup({
      checkIn: new FormControl(null),
      checkOut: new FormControl(null)
  })
}

  ngOnInit(): void {
      this.formGroup.patchValue({
        checkIn:this.dialogData.checkIn,
        checkOut:this.dialogData.checkOut
      }); 
    }

    onCancelClick(){
      this.matDialogRef.close();
    }

    onSaveClick(){
        
      this.isWorking = true; 
      this.bookingService.putBooking({...this.dialogData, ...this.formGroup.value})
        .subscribe((response : Booking) => {
                    
          this.matDialogRef.close({result:"Saved", data:response}); 
          this.isWorking = false; 
          

        }, (error) => {
          
          console.log(error); 
          this.isWorking = true; 

        }) 
    }

    onCheckInDateChange(){
      let newCheckOutDate : Date = new Date(this.formGroup.value.checkIn);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1); 
      this.formGroup.patchValue({checkOut:newCheckOutDate.toISOString()}); 
    }

  

}
