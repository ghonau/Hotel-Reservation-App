import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from '../components/notifications/notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackbar : MatSnackBar) { }

  showNotification(message : string, buttonText : string, messageType: 'error'| 'success'){
    this.matSnackbar.openFromComponent(NotificationsComponent, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass:"notification-panel",
      data:{
        message: message,
        buttonText : buttonText,
        messageType
      }
    }); 

  }
}
