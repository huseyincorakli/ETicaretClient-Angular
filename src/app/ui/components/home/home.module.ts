import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { BrandsComponent } from './brands/brands.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { SlicePipe } from '@angular/common';


@NgModule({
  declarations: [HomeComponent, HeroComponent, BrandsComponent, CampaignsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    SlicePipe
  ],
})
export class HomeModule {}
