import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:MainPageComponent}
    ]),
    NgxFileDropModule,
    
  ]
})
export class MainPageModule { }
