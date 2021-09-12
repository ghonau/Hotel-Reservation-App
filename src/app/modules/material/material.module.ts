import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatExpansionModule} from '@angular/material/expansion'
import {MatBadgeModule} from '@angular/material/badge'
import {MatDividerModule} from '@angular/material/divider'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSidenavModule} from '@angular/material/sidenav' 
import {MatListModule} from '@angular/material/list'
import {MatRippleModule} from '@angular/material/core'
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatStepperModule} from '@angular/material/stepper'
import {MatSelectModule} from '@angular/material/select'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatCardModule} from '@angular/material/card'
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTabsModule} from '@angular/material/tabs'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'; 
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 



const materialModules = [ MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatBadgeModule,
  MatDividerModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule,
  MatRippleModule,
  MatGridListModule,
  MatProgressBarModule,
  MatStepperModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatCardModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatTabsModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule, 
  MatDialogModule,
  MatSortModule
]



@NgModule({
  declarations: [],
  imports: [
    materialModules],
   exports:[
     materialModules
   ]
})
export class MaterialModule { }
