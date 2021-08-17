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
  MatGridListModule
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
