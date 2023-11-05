import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AddressSettingsComponent } from './address-settings/address-settings.component';



@NgModule({
  declarations: [
    SettingsComponent,
    ProfileSettingsComponent,
    AddressSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),

  ]
})
export class SettingsModule { }
